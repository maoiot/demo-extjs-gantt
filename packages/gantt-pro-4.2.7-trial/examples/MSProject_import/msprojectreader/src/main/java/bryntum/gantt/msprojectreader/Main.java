/**
 * MSProject import example.
 * Copyright Bryntum, 2015
 */
package bryntum.gantt.msprojectreader;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import net.sf.mpxj.Column;
import net.sf.mpxj.FieldType;
import net.sf.mpxj.MPXJException;
import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Relation;
import net.sf.mpxj.Resource;
import net.sf.mpxj.ResourceAssignment;
import net.sf.mpxj.Table;
import net.sf.mpxj.Task;
import net.sf.mpxj.TaskMode;
import net.sf.mpxj.TimeUnit;
import net.sf.mpxj.mpp.MPPReader;

public class Main {
    private static String errorMessage = "There was an exception raised during the operation. Exception message: ";
    private static String wrongUsageMessage = "Usage: java -jar bryntum-msproject-reader.jar mpp-file output-file \nNote: provide \"1\" instead of output-file path to return JSON into stdout.";

    static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    static int indentFactor = 4;

    static Map<String, Integer> dependencyTypesByAlias;
    static Map<String, String> columnXTypesByName;
    static Map<String, JSONObject> columnOptionsByName;
    static Map<String, String> unitNamesByTimeUnitName;

    static {
        unitNamesByTimeUnitName = new Hashtable<String, String>();
        // TimeUnit supported names are: [m, h, d, w, mo, %, y, em, eh, ed, ew, emo, ey, e%]
        // but the Gantt needs minutes to be marked as "mi" and not "m" ("m" means months in the Gantt)
        unitNamesByTimeUnitName.put("m", "mi");
    }

    // initialize dependency/column types mappings
    static {
        // dependency types codes
        dependencyTypesByAlias = new Hashtable<String, Integer>();
        dependencyTypesByAlias.put("FF", 3);
        dependencyTypesByAlias.put("FS", 2);
        dependencyTypesByAlias.put("SF", 1);
        dependencyTypesByAlias.put("SS", 0);

        // list of known columns
        columnXTypesByName = new Hashtable<String, String>();
        columnXTypesByName.put("Task Name", "namecolumn");
        columnXTypesByName.put("Duration", "durationcolumn");
        columnXTypesByName.put("Start", "startdatecolumn");
        columnXTypesByName.put("Finish", "enddatecolumn");
        columnXTypesByName.put("% Complete", "percentdonecolumn");
        columnXTypesByName.put("Resource Names", "resourceassignmentcolumn");
        columnXTypesByName.put("Early Start", "earlystartdatecolumn");
        columnXTypesByName.put("Early Finish", "earlyenddatecolumn");
        columnXTypesByName.put("Late Start", "latestartdatecolumn");
        columnXTypesByName.put("Late Finish", "lateenddatecolumn");
        columnXTypesByName.put("Total Slack", "slackcolumn");
        columnXTypesByName.put("Rollup", "rollupcolumn");
        columnXTypesByName.put("Baseline Start", "baselinestartdatecolumn");
        columnXTypesByName.put("Baseline Finish", "baselineenddatecolumn");

        // some of columns should have extra options
        columnOptionsByName = new Hashtable<String, JSONObject>();
        columnOptionsByName.put("Predecessors",
                new JSONObject("{ xtype : \"predecessorcolumn\", useSequenceNumber : true }"));
    }

    public static void main(String[] args) throws IOException {
        String sourceFile, targetFile;
        Boolean printResult;

        try {
            if (args.length < 2) {
                System.out.println(wrongUsageMessage);
                System.exit(0);
            }

            sourceFile = args[0];
            targetFile = args[1];
            printResult = targetFile.equals("1");

            // optional indent size for resulting JSON string
            if (args.length > 2 && args[2] != null) {
                indentFactor = Integer.parseInt(args[2]);
            }

            if (args.length > 3 && args[3] != null) {
                dateFormat = new SimpleDateFormat(args[3]);
            }

            String result = getProjectJSONString(sourceFile, indentFactor);

            if (printResult) {
                System.out.println(result);
            } else {
                BufferedWriter out = new BufferedWriter(new FileWriter(targetFile));
                out.write(result);
                out.close();
            }

        } catch (Exception e) {
            System.out.println(errorMessage + e);
            System.exit(0);
        }
    }

    /**
     * Extracts the provided task data into JSON object.
     *
     * @param task
     *            Task to extract
     * @return JSON object keeping the extracted task data
     */
    private static JSONObject getTaskJSON(Task task) {
        JSONObject object = new JSONObject();

        object.put("Id", task.getUniqueID());
        object.put("Name", task.getName());
        object.put("StartDate", dateFormat.format(task.getStart()));
        object.put("EndDate", dateFormat.format(task.getFinish()));
        object.put("Duration", task.getDuration().getDuration());
        object.put("DurationUnit", getUnitByTimeUnit(task.getDuration().getUnits()));
        object.put("PercentDone", task.getPercentageComplete());
        object.put("Milestone", task.getMilestone());
        object.put("Rollup", task.getRollup());
        object.put("ManuallyScheduled", task.getTaskMode() == TaskMode.MANUALLY_SCHEDULED);
        // TODO: import constraints after their behavior gets closer to the
        // MSProject one
        // object.put("ConstraintDate", dateFormat.format(task.getConstraintDate()));
        // object.put("ConstraintType", task.getConstraintType());

        if (task.getBaselineStart() != null) {
            object.put("BaselineStartDate", task.getBaselineStart());
        } else {
            object.put("BaselineStartDate", "");
        }
        if (task.getBaselineFinish() != null) {
            object.put("BaselineEndDate", task.getBaselineFinish());
        } else {
            object.put("BaselineEndDate", "");
        }
        // TODO: BaselineDuration is not supported by the Gantt Task model at the moment, so this code doesn't work really
        if (task.getBaselineDuration() != null) {
            object.put("BaselineDuration", task.getBaselineDuration());
        } else {
            object.put("BaselineDuration", "");
        }

        // retrieve the task children info
        JSONArray children = new JSONArray();

        for (Task child : task.getChildTasks()) {
            children.put(getTaskJSON(child));
        }

        object.put("children", children);
        object.put("leaf", children.length() == 0);

        return object;
    }

    /**
     * Extracts the provided MPP file contents into a JSON object.
     *
     * @param projectFile
     *            MPP file to process
     * @return A JSON object containing the project data (tasks, dependencies,
     *         resources, assignments).
     */
    public static JSONObject getProjectJSON(ProjectFile projectFile) {
        JSONArray children = new JSONArray();
        Task firstTask = projectFile.getChildTasks().get(0);

        for (Task task : firstTask.getChildTasks()) {
            children.put(getTaskJSON(task));
        }

        int dependencyId = 0;

        JSONObject dependencyObject;
        JSONArray dependencies = new JSONArray();

        // extract all the dependencies
        for (Task task : projectFile.getAllTasks()) {

            List<Relation> predecessors = task.getPredecessors();

            if (predecessors != null && predecessors.isEmpty() == false) {
                for (Relation relation : predecessors) {
                    dependencyObject = new JSONObject();

                    dependencyObject.put("Id", dependencyId++);
                    dependencyObject.put("To", relation.getSourceTask().getUniqueID());
                    dependencyObject.put("From", relation.getTargetTask().getUniqueID());
                    dependencyObject.put("Lag", relation.getLag().getDuration());
                    dependencyObject.put("LagUnit", getUnitByTimeUnit(relation.getLag().getUnits()));
                    dependencyObject.put("Type", dependencyTypesByAlias.get(relation.getType().toString()));
                    dependencies.put(dependencyObject);
                }
            }
        }

        JSONObject resourceObject, assignmentObject;
        JSONArray assignments = new JSONArray();
        JSONArray resources = new JSONArray();

        // extract all the resources
        for (Resource resource : projectFile.getAllResources()) {
            resourceObject = new JSONObject();

            resourceObject.put("Id", resource.getUniqueID());
            resourceObject.put("Name", (resource.getName() != null ? resource.getName() : "New resource"));
            resources.put(resourceObject);

            // corresponding resource' assignment
            for (ResourceAssignment assignment : resource.getTaskAssignments()) {
                assignmentObject = new JSONObject();

                assignmentObject.put("Id", assignment.getUniqueID());
                assignmentObject.put("ResourceId", resource.getUniqueID());
                assignmentObject.put("TaskId", assignment.getTask().getUniqueID());
                assignmentObject.put("Units", assignment.getUnits());
                assignments.put(assignmentObject);
            }
        }

        FieldType fieldType;
        String fieldTypeName;
        JSONObject columnObject;
        JSONArray columns = new JSONArray();

        Iterator<Table> i = projectFile.getTables().iterator();

        // extract columns
        if (i.hasNext()) {
            Table table = i.next();

            for (Column column : table.getColumns()) {
                fieldType = column.getFieldType();

                // skip column if we don't know its type
                if (fieldType != null) {
                    // get the column type name in US locale
                    fieldTypeName = fieldType.getName(Locale.US);

                    JSONObject columnOptions = getColumnOptions(fieldTypeName);
                    // if we have options for the column
                    if (columnOptions != null) {
                        columnObject = new JSONObject(columnOptions, JSONObject.getNames(columnOptions));
                    } else {
                        columnObject = new JSONObject();

                        String columnXType = getColumnXType(fieldTypeName);
                        // skip unknown columns
                        if (columnXType.equals(""))
                            continue;

                        columnObject.put("xtype", columnXType);
                    }

                    columns.put(columnObject);
                }
            }
        }

        JSONObject rootTask = new JSONObject();
        rootTask.put("children", children);
        rootTask.put("Name", "Root Node");

        // put all the data into a single object
        JSONObject result = new JSONObject();
        result.put("tasks", rootTask);
        result.put("dependencies", dependencies);
        result.put("assignments", assignments);
        result.put("resources", resources);
        result.put("columns", columns);

        return result;
    }

    static String getUnitByTimeUnit(TimeUnit timeUnit) {
        String unitName = null;

        if (timeUnit != null) {
            unitName = timeUnit.getName();

            if (unitNamesByTimeUnitName.containsKey(unitName)) {
                return unitNamesByTimeUnitName.get(unitName);
            }
        }

        return unitName;
    }

    static String getColumnXType(String columnName) {
        if (columnName == null || !columnXTypesByName.containsKey(columnName))
            return "";
        return columnXTypesByName.get(columnName).toString();
    }

    static JSONObject getColumnOptions(String columnName) {
        if (columnName == null || !columnOptionsByName.containsKey(columnName))
            return null;
        return columnOptionsByName.get(columnName);
    }

    /**
     * Extracts the provided MPP file contents into a string (a serialized JSON
     * object).
     *
     * @param projectFile
     *            MPP file to process
     * @param indentFactor
     *            Indentation size for JSON serializing
     * @return A serialized JSON object containing the project data (tasks,
     *         dependencies, resources, assignments).
     * @throws MPXJException
     */
    public static String getProjectJSONString(String projectFile, int indentFactor) throws MPXJException {
        return getProjectJSON(new MPPReader().read(projectFile)).toString(indentFactor);
    }
}
