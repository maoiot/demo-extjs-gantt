/**
 * Generates gantt related data set using random number generator with user defined seed.
 */
Ext.define('Gnt.data.Generator', function() {

    // The list is taken from http://www.sttmedia.com/syllablefrequency-english
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var SYLLABLES = ['al', 'an', 'ar', 'as', 'at', 'ea', 'ed', 'en', 'er', 'es', 'ha', 'he', 'hi', 'in', 'is', 'it', 'le', 'me', 'nd', 'ne', 'ng', 'nt', 'on', 'or', 'ou', 're', 'se', 'st', 'te', 'th', 'ti', 'to', 've', 'wa', 'all', 'and', 'are', 'but', 'ent', 'era', 'ere', 'eve', 'for', 'had', 'hat', 'hen', 'her', 'hin', 'his', 'ing', 'ion', 'ith', 'not', 'ome', 'oul', 'our', 'sho', 'ted', 'ter', 'tha', 'the', 'thi', 'tio', 'uld', 'ver', 'was', 'wit', 'you'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var VERBS = ['be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var NOUNS = ['time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child', 'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem', 'hand', 'part', 'place', 'case', 'week', 'company', 'system'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var PARTS = ['', 'and', '', 'or', '', 'either', '', 'versus', '', 'under', '', 'on', '', 'in', '', 'into'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var FIRST_NAMES = ['Thiago', 'Daniel', 'Miguel', 'Liam', 'Jack', 'William', 'Agustin', 'Santiago', 'Jayden', 'Ramon', 'Luis', 'Sebastian', 'Noah', 'Ethan', 'Jayden', 'David', 'Deven', 'James', 'Sofia', 'Alysha', 'Sophia', 'Olivia', 'Lea', 'Mariana', 'Widelene', 'Gabriele', 'Ximena', 'Maria', 'Mia', 'Emma', 'Madison', 'Chloe', 'Isabella', 'Anya', 'Mary', 'Florencia', 'Camila'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodrigues', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reye', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher'];
    /**
     * @member Gnt.data.Generator
     * @static
     */
    var NAME_MIDS = ['', 'von', '', 'ibn', '', 'ala', '', 'de', '', 'der'];


    /**
     * Normalizes data generation specification, fills in missing properties using formulas given below.
     *
     * @param {Object} spec
     * @param {Number} [spec.tasks=100] Number of tasks to generate (Nt)
     * @param {Number} [spec.segmented=0.1Nt] Number of segmented tasks to generate (Nst, 0 <= Nst <= 0.2Nt)
     * @param {Number} [spec.milestones=0.2Nt] Number of milestones to generate (Nm, 0 <= Nm <= 0.3Nt)
     * @param {Number} [spec.summaries=0.1Nt] Number of summary nodes to generate (Ns, 0 <= Ns <= 0.5Nt)
     * @param {Number} [spec.projects=0.01Nt] Number of project nodes to generate (Np, 0 <= Np <= 0.01Nt)
     * @parma {Number} [spec.dependencies=1.3Nt] Number of dependencies to generate (Nd, 0 <= Nt <= 2Nt)
     * @param {Number} [spec.resources=2.0Nt] Number of resources to generate (Nr, 0 <= 2.0Nt)
     * @param {Number} [spec.assignments=Nr] Number of assignments to generate (Na, Na >= Nr)
     * @param {Number} [spec.calendars=0.1(Nr + Nt)] Number of calendars to generate (Nc, 0 <= Nt + Nr)
     * @param {Number} [spec.parentCalendars=0.1Nc] Number of parent calendars to generate (Npc, 0 <= Npc <= 0.5Nc)
     * @param {Number} [spec.minDuration=1] Minimal task duration (MinD, MinD >= 1)
     * @param {Number} [spec.maxDuration=10MinD] Maximum task duration (MaxD, MinD <= MaxD)
     * @param {Number} [spec.minDependencyLag=-MaxD / 3] Minimum dependency lag (MinDL, MinDL >= -MaxD / 3)
     * @param {Number} [spec.maxDependencyLag=+MaxD / 3] Maximum dependency lag (MaxDL, MaxDL <= +MaxD / 3)
     * @param {Date}   [spec.startDate=2015/01/01]
     * @param {Object} [spec.calendarManagerConfig]
     * @param {Object} [spec.taskStoreConfig]
     * @param {Object} [spec.dependencyStoreConfig]
     * @param {Object} [spec.resourceStoreConfig]
     * @param {Object} [spec.assignmentStoreConfig]
     * @return {Object}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function normalizeDataSpecification(spec) {
        spec = Ext.isObject(spec) && spec || {};

        spec.tasks            = spec.tasks > 0 && spec.tasks || 100;
        spec.segmented        = Math.min(spec.segmented       > 0 && spec.segmented       || Math.floor(0.1 * spec.tasks),  Math.floor(0.2 * spec.tasks));
        spec.milestones       = Math.min(spec.milestones      > 0 && spec.milestones      || Math.floor(0.2 * spec.tasks),  Math.floor(0.3 * spec.tasks));
        spec.summaries        = Math.min(spec.summaries       > 0 && spec.summaries       || Math.floor(0.1 * spec.tasks),  Math.floor(0.5 * spec.tasks));
        spec.projects         = Math.min(spec.projects        > 0 && spec.projects        || Math.floor(0.01 * spec.tasks), Math.floor(0.1 * spec.tasks));
        spec.dependencies     = Math.min(spec.dependencies    > 0 && spec.dependencies    || Math.floor(1.3 * spec.tasks),  2 * spec.tasks);
        spec.resources        = Math.min(spec.resources       > 0 && spec.resources       || Math.floor(2.0 * spec.tasks),  2 * spec.tasks);
        spec.assignments      = Math.max(spec.assignments     > 0 && spec.assignments     || spec.resources,                spec.resources);
        spec.calendars        = Math.min(spec.calendars       > 0 && spec.calendars       || Math.floor(0.1 * (spec.tasks + spec.resources)), spec.tasks + spec.resources);
        spec.parentCalendars  = Math.min(spec.parentCalendars > 0 && spec.parentCalendars || Math.floor(0.1 * spec.calendars), Math.floor(0.5 * spec.calendars));
        spec.minDuration      = spec.minDuration >= 1 && spec.minDuration || 1;
        spec.maxDuration      = spec.maxDuration >= spec.minDuration && spec.maxDuration || 10 * spec.minDuration;
        spec.minDependencyLag = spec.minDependencyLag >= -Math.floor(spec.maxDuration / 3) ? spec.minDependencyLag : -Math.floor(spec.maxDuration / 3);
        spec.maxDependencyLag = spec.maxDependencyLag <=  Math.floor(spec.maxDuration / 3) ? spec.maxDependencyLag :  Math.floor(spec.maxDuration / 3);
        spec.startDate        = spec.startDate || new Date(2015, 0, 1);

        spec.calendarManagerConfig = spec.calendarManagerConfig || {};
        spec.taskStoreConfig       = spec.taskStoreConfig || {};
        spec.dependencyStoreConfig = spec.dependencyStoreConfig || {};
        spec.resourceStoreConfig   = spec.resourceStoreConfig || {};
        spec.assignmentStoreConfig = spec.assignmentStoreConfig || {};

        return spec;
    }

    /**
     * Generates calendar name.
     *
     * @param {Function} random
     * @param {Number} minLen Minimum name length in syllables
     * @param {Number} maxLen Maximum name length in syllables
     * @return {String}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateCalendarName(random, minLen, maxLen) {
        var name      = [],
            i, len;

        minLen = minLen || 2;
        maxLen = maxLen || 5;

        for (i = 0, len = random(minLen, maxLen); i < len; ++i) {
            name.push(random(SYLLABLES));
        }

        return Ext.String.capitalize(name.join(''));
    }

    /**
     * Generates task name using most used English verbs, nouns and parts.
     *
     * @param {Function} random
     * @return {String}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateTaskName(random) {
        var verb  = random(VERBS),
            noun  = random(NOUNS),
            part  = random(PARTS);

        if (part !== '') {
            noun = [noun, part, random(NOUNS)].join(' ');
        }

        return Ext.String.capitalize(verb) + ' ' + noun;
    }

    /**
     * Generates a resource name using most used American first/second names as well as name middle parts.
     *
     * @param {Function} random
     * @return {String}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateResourceName(random) {
        var firstName  = random(FIRST_NAMES),
            lastName   = random(LAST_NAMES),
            mid        = random(NAME_MIDS);

        if (mid !== '') {
            lastName = mid + ' ' + lastName;
        }

        return firstName + ' ' + lastName;
    }

    /**
     * Generates calendar data.
     *
     * @param {Function} random
     * @param {Number|String} [idSuffix=0]
     * @param {Array} [children=null]
     * @return {Object}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateCalendarData(random, idSuffix, children) {
        var EF = Ext.util.Format,
            hasLunchBreak,
            lunchStartsAt,
            defaultAvailability,
            intervalStart, intervalEnd,
            weekendsAreWorkDays,
            id, name;

        idSuffix = idSuffix || 'project';

        defaultAvailability = [];
        hasLunchBreak = 0.5 < random();
        weekendsAreWorkDays = 0.5 < random();

        if (hasLunchBreak) {

            lunchStartsAt = random(10, 16);
            intervalStart = random(0, lunchStartsAt);
            intervalEnd   = random(lunchStartsAt + 2, 25);

            defaultAvailability.push(EF.leftPad(intervalStart,     2, '0') + ':00-' + EF.leftPad(lunchStartsAt, 2, '0') + ':00');
            defaultAvailability.push(EF.leftPad(lunchStartsAt + 1, 2, '0') + ':00-' + EF.leftPad(intervalEnd,   2, '0') + ':00');
        }
        else {

            intervalStart = random(0, 13);
            intervalEnd   = random(intervalStart + 1, 25);
            defaultAvailability.push(EF.leftPad(intervalStart, 2, '0') + ':00-' + EF.leftPad(intervalEnd, 2, '0') + ':00');
        }

        name = generateCalendarName(random);
        id   = name + '_' + idSuffix;

        return {
            Id                  : id,
            CalendarId          : id,
            Name                : name,
            DefaultAvailability : defaultAvailability,
            WeekendsAreWorkDays : weekendsAreWorkDays,
            children            : children && children.length && children || null,
            leaf                : children && children.length ? false : true
        };
    }

    /**
     * Generates calendar manager according to specification.
     *
     * @param {Function} random
     * @param {Object} spec
     * @return {Gnt.data.CalendarManager}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateCalendarManager(random, spec) {
        var calendarManager = new Gnt.data.CalendarManager(spec.calendarManagerConfig),
            projectCalendar,
            parentCalendars,
            childCalendars,
            calendar, parentCalendar,
            calendarTypes,
            i;

        projectCalendar = calendarManager.getRoot().appendChild(generateCalendarData(random));
        calendarManager.setProjectCalendar(projectCalendar);

        parentCalendars = [projectCalendar]
        childCalendars  = [];

        for (i = 1; i < spec.calendars; ++i) {

            calendarTypes = {
                'parent' : childCalendars.length > 0 ? spec.parentCalendars / spec.calendars : 0,
                'child'  : childCalendars.length > 0 ? (spec.calendars - spec.parentCalendars) / spec.calendars : 1
            }

            switch (random(calendarTypes)) {
                case 'parent':
                    calendar = generateCalendarData(random, i, childCalendars);
                    parentCalendar = random(parentCalendars);
                    parentCalendars.push(parentCalendar.appendChild(calendar));
                    childCalendars = [];
                    break;
                case 'child':
                /* falls through */
                default:
                    calendar = generateCalendarData(random, i);
                    childCalendars.push(projectCalendar.appendChild(calendar));
            }
        }

        return calendarManager;
    }

    /**
     * Generates task segments specification
     *
     * @param {Function} random
     * @param {Date} startDate
     * @param {Number} duration
     * @return {[Object]}
     */
    function generateTaskSegments(random, startDate, duration, idBase) {
        var firstDuration,
            secondDuration,
            gapDuration;

        firstDuration = random(0.1, 0.4) * duration;
        secondDuration = random(0.1, 0.4) * duration;
        gapDuration = duration - firstDuration - secondDuration;

        return [{
            Id        : idBase + '_segment_1',
            StartDate : startDate,
            Duration  : firstDuration
        }, {
            Id        : idBase + '_segment_2',
            StartDate : Ext.Date.add(startDate, Ext.Date.DAY, firstDuration + gapDuration),
            Duration  : secondDuration
        }];
    }

    /**
     * Generates task store according to specification
     *
     * @param  {Function} random
     * @param  {Object} spec
     * @param  {Gnt.data.CalendarManager} calendarManager
     * @return {Gnt.data.TaskStore}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateTaskStore(random, spec, calendarManager) {
        var SUD             = Sch.util.Date,
            projectCalendar = calendarManager.getProjectCalendar().getCalendar(),
            taskStore       = new Gnt.data.TaskStore(Ext.apply({}, spec.taskStoreConfig, {
                calendar : projectCalendar,
                root     : { expanded : true, loaded : true }
            })),
            startDate       = spec.startDate,
            root            = taskStore.getRoot(),
            calendars,
            projects,
            summaries,
            tmp,
            tasks,
            task,
            taskCalendar,
            duration,
            schedulingMode,
            taskTypes,
            i;

        // Collecting calendars
        calendars = [];
        calendarManager.getRoot().cascadeBy(function(calendarNode) {
            !calendarNode.isRoot() && calendars.push(calendarNode.getCalendar());
        });

        projects  = [];
        summaries = [];
        tasks     = [];

        for (i = 0; i < spec.tasks; ++i) {

            taskCalendar = random(calendars);

            taskTypes      = {
                'project'   : (summaries.length + tasks.length) > 0 ? spec.projects / spec.tasks : 0,
                'summary'   : (summaries.length + tasks.length) > 0 ? spec.summaries / spec.tasks : 0,
                'milestone' : spec.milestones / spec.tasks,
                'segmented' : spec.segmented / spec.tasks,
                'normal'    : (spec.tasks - ((summaries.length + tasks.length) > 0 ? spec.projects + spec.summaries : 0) - spec.milestones - spec.segmented) / spec.tasks
            }

            switch (random(taskTypes)) {
            case 'project':

                task = new Gnt.model.Project({
                    Id         : i + 1,
                    Name       : generateTaskName(random),
                    StartDate  : startDate,
                    Segments   : null,
                    //CalendarId : taskCalendar !== projectCalendar ? taskCalendar.getCalendarId() : null,
                    children   : [].concat(summaries, tasks),
                    expanded   : true
                });

                summaries = [];
                tasks     = [];
                projects.push(task);

                break;

            case 'summary':

                tmp = [].concat(
                    Ext.Array.filter(summaries, function(summary) { return random() < 0.1; }),
                    Ext.Array.filter(tasks, function(task) { return random() < 0.7; })
                );

                task = new Gnt.model.Task({
                    Id         : i + 1,
                    Name       : generateTaskName(random),
                    Duration   : 0,
                    StartDate  : startDate,
                    Segments   : null,
                    //CalendarId : taskCalendar !== projectCalendar ? taskCalendar.getCalendarId() : null,
                    children   : tmp,
                    expanded   : true
                });

                summaries = Ext.Array.difference(summaries, tmp);
                tasks     = Ext.Array.difference(tasks, tmp);
                summaries.push(task);

                break;

            case 'milestone':

                task = new Gnt.model.Task({
                    Id         : i + 1,
                    Name       : generateTaskName(random),
                    Duration   : 0,
                    StartDate  : startDate,
                    EndDate    : startDate,
                    Segments   : null,
                    //CalendarId : taskCalendar !== projectCalendar ? taskCalendar.getCalendarId() : null,
                    leaf       : true
                });

                tasks.push(task);

                break;

            case 'segmented':

                duration = random(spec.minDuration, spec.maxDuration + 1);
                schedulingMode = random(['Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'FixedDuration', 'EffortDriven', 'DynamicAssignment']);

                task = new Gnt.model.Task({
                    Id             : i + 1,
                    Name           : generateTaskName(random),
                    Duration       : duration,
                    StartDate      : startDate,
                    SchedulingMode : schedulingMode,
                    Effort         : random(1, duration * 12),
                    Segments       : generateTaskSegments(random, startDate, duration, i + 1),
                    //EndDate    : taskCalendar.skipWorkingTime(startDate, duration, SUD.DAY),
                    //CalendarId : taskCalendar !== projectCalendar ? taskCalendar.getCalendarId() : null,
                    leaf       : true
                });

                tasks.push(task);
                break;

            case 'normal':
            /* falls through */
            default:

                duration = random(spec.minDuration, spec.maxDuration + 1);
                schedulingMode = random(['Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'FixedDuration', 'EffortDriven', 'DynamicAssignment']);

                task = new Gnt.model.Task({
                    Id             : i + 1,
                    Name           : generateTaskName(random),
                    Duration       : duration,
                    StartDate      : startDate,
                    SchedulingMode : schedulingMode,
                    Effort         : random(1, duration * 12),
                    Segments   : null,
                    //EndDate    : taskCalendar.skipWorkingTime(startDate, duration, SUD.DAY),
                    //CalendarId : taskCalendar !== projectCalendar ? taskCalendar.getCalendarId() : null,
                    leaf       : true
                });

                tasks.push(task);
            }
        }

        // Distributing nodes which are left
        for (i = 0; i < projects.length; ++i) {
            root.appendChild(projects[i]);
        }

        for (i = 0; i < summaries.length; ++i) {
            (projects.length && random(projects) || root).appendChild(summaries[i]);
        }

        summaries = [];
        root.cascadeBy(function(node) {
            !node.isRoot() && !node.isLeaf() && summaries.push(node);
        });

        for (i = 0; i < tasks.length; ++i) {
            (summaries.length && random(summaries) || root).appendChild(tasks[i]);
        }

        return taskStore;
    }

    /**
     * Generates dependency store according to specification.
     *
     * @param {Functiom} random
     * @param {Object} spec
     * @param {Gnt.data.TaskStore} taskStore
     * @return {Gnt.data.DependencyStore}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateDependencyStore(random, spec, taskStore) {
        var EA = Ext.Array,
            dependencyStore = new Gnt.data.DependencyStore(spec.dependencyStoreConfig),
            deps  = [],
            linked = {},
            tasks, task1, task2, task1index,
            linkedKey, dependencyCreated, i;

        taskStore.setDependencyStore(dependencyStore);

        // Flatten the tasks tree, taking leafs into account only
        tasks = [];
        taskStore.getRoot().cascadeBy(function(node) {
            node.isLeaf() && tasks.push(node);
        });

        for (i = 0; i < spec.dependencies; ++i) {

            dependencyCreated = false;

            while (!dependencyCreated) {

                task1 = random(tasks);
                task1index = EA.indexOf(tasks, task1);

                if (task1index > 0) {
                    task2 = random(EA.slice(tasks, 0, task1index), function(index) {
                        return 1 / (task1index - index);
                    });

                    linkedKey = [task1.getId(), task2.getId()].sort().join('+');

                    if (!linked[linkedKey]) {

                        linked[linkedKey] = true;

                        deps.push({
                            Id   : deps.length + 1,
                            From : task2,
                            To   : task1,
                            Lag  : random(spec.minDependencyLag, spec.maxDependencyLag + 1),
                            Type : random([0, 1, 2, 3, 2, 2, 2, 2])
                        });

                        dependencyCreated = true;
                    }
                }
            }
        }

        dependencyStore.add(deps);

        return dependencyStore;
    }

    /**
     * Generates resource store according to specification.
     *
     * @param {Function} random
     * @param {Object} spec
     * @param {Gnt.data.CalendarManager} calendarManager
     * @param {Gnt.data.TaskStore} taskStore
     * @return {Gnt.data.ResourceStore}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateResourceStore(random, spec, calendarManager, taskStore) {
        var resourceStore = new Gnt.data.ResourceStore(spec.resourceStoreConfig),
            projectCalendarNode = calendarManager.getProjectCalendar(),
            calendars = [null],
            resources = [],
            i, len;

        taskStore.setResourceStore(resourceStore);

        // Collecting calendars
        calendarManager.getRoot().cascadeBy(function(calendarNode) {
            !calendarNode.isRoot() && calendarNode !== projectCalendarNode && calendars.push(calendarNode.getCalendar().getCalendarId());
        });

        for (i = 0, len = spec.resources; i < len; ++i) {
            resources.push({
                Id         : i + 1,
                Name       : generateResourceName(random),
                CalendarId : random(calendars)
            });
        }

        resourceStore.add(resources);

        return resourceStore;
    }

    /**
     * Generates assignment store according to specification.
     *
     * @param {Function} random
     * @param {Object} spec
     * @param {Gnt.data.TaskStore} taskStore
     * @param {Gnt.data.ResourceStore} resourceStore
     * @return {Gnt.data.AssignmentStore}
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateAssignmentStore(random, spec, taskStore, resourceStore) {
        var assignmentStore = new Gnt.data.AssignmentStore(spec.assignmentStoreConfig),
            assignments = [],
            assigned = {},
            assignedKey,
            tasks, resources,
            task, resource;

        taskStore.setAssignmentStore(assignmentStore);

        tasks = [];
        taskStore.getRoot().cascadeBy(function(taskNode) {
            taskNode.isLeaf() && !taskNode.isMilestone() && tasks.push(taskNode);
        });

        resources = resourceStore.getRange();

        while (assignments.length < spec.assignments) {
            task = random(tasks);
            resource = random(resources);
            assignedKey = task.getId() + '+' + resource.getId();
            if (!assigned[assignedKey]) {
                assigned[assignedKey] = true;
                assignments.push({
                    Id : assignedKey,
                    TaskId : task.getId(),
                    ResourceId : resource.getId(),
                    Units : random(1, 101)
                });
            }
        }

        assignmentStore.add(assignments);

        return assignmentStore;
    }

    /**
     * Generates gantt related data according to specification.
     *
     * @param {Function} random
     * @param {Object} spec
     *
     * @static
     * @member Gnt.data.Generator
     */
    function generateData(random, spec) {
        var calendarManager,
            taskStore,
            dependencyStore,
            resourceStore,
            assignmentStore,
            crudManager;

        spec = normalizeDataSpecification(spec);

        calendarManager = generateCalendarManager(random, spec);
        taskStore       = generateTaskStore(random, spec, calendarManager);
        dependencyStore = generateDependencyStore(random, spec, taskStore);
        resourceStore   = generateResourceStore(random, spec, calendarManager, taskStore);
        assignmentStore = generateAssignmentStore(random, spec, taskStore, resourceStore);

        taskStore.getRoot().propagateChanges();
        taskStore.adjustToCalendar();

        crudManager = new Gnt.data.CrudManager(Ext.apply({}, spec.crudManagerConfig, {
            calendarManager : calendarManager,
            taskStore       : taskStore,
            dependencyStore : dependencyStore,
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        }));
        crudManager.commit();

        return {
            crudManager     : crudManager,
            calendarManager : calendarManager,
            taskStore       : taskStore,
            dependencyStore : dependencyStore,
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        };
    }

    //
    // Class public interface
    //
    return {
        uses : [
            'Gnt.data.Random'
        ],

        config : {
            /**
             * Seed to use for random numbers generator during the generation, requires seedrandom library to work properly
             */
            seed : 'Bryntum',
            /**
             * Total amount of tasks to generate
             */
            tasks            : null,
            /**
             * Total amount of segmented tasks to include into tasks
             */
            segmented        : null,
            /**
             * Amount of milestones to include into tasks
             */
            milestones       : null,
            /**
             * Amount of summary nodes to include into tasks
             */
            summaries        : null,
            /**
             * Amount of project nodes to include into tasks
             */
            projects         : null,
            /**
             * Amount of dependencies to generate
             */
            dependencies     : null,
            /**
             * Amount fo resources to generate
             */
            resources        : null,
            /**
             * Amount of assignments to generate
             */
            assignments      : null,
            /**
             * Amount of calendars to generate
             */
            calendars        : null,
            /**
             * Amount of parent calendars to include into calendars
             */
            parentCalendars  : null,
            /**
             * Minimal task duration
             */
            minDuration      : null,
            /**
             * Maximum task duration
             */
            maxDuration      : null,
            /**
             * Minimal dependency lag, might be negative
             */
            minDependencyLag : null,
            /**
             * Maximum dependency lag
             */
            maxDependencyLag : null,
            /**
             * Timespan start date
             */
            startDate        : null,
            /**
             * Additional calendar manager config to use
             */
            calendarManagerConfig : null,
            /**
             * Additional task manager config to use
             */
            taskStoreConfig       : null,
            /**
             * Additional dependency store config to use
             */
            dependencyStoreConfig : null,
            /**
             * Additional resource store config to use
             */
            resourceStoreConfig   : null,
            /**
             * Additional assignment store config to use
             */
            assignmentStoreConfig : null,
            /**
             * Additional CRUD manager config to use
             */
            crudManagerConfig     : null
        },

        constructor : function(config) {
            var me = this,
                statics = me.statics();

            me.initConfig(config);
            me.setConfig(statics.normalizeDataSpecification(me.getConfig()));
        },

        makeRandom : function() {
            return Gnt.data.Random.makeGenerator(this.getSeed());
        },

        /**
         * Generates data set according to generator configuration
         */
        generateData : function() {
            var me = this;
            return generateData(me.makeRandom(), me.getConfig());
        },

        /**
         * Generates calendar manager
         */
        generateCalendarManager : function() {
            var me = this;
            return generateCalendarManager(me.makeRandom(), me.getConfig());
        },

        /**
         * Generates task store
         */
        generateTaskStore : function(calendarManager) {
            var me = this;
            return generateTaskStore(me.makeRandom(), me.getConfig(), calendarManager);
        },

        /**
         * Generates dependency store
         */
        generateDependencyStore : function(taskStore) {
            var me = this;
            return generateDependencyStore(me.makeRandom(), me.getConfig(), taskStore);
        },

        /**
         * Generates resource store
         */
        generateResourceStore : function(calendarManager, taskStore) {
            var me = this;
            return generateResourceStore(me.makeRandom(), me.getConfig(), calendarManager, taskStore);
        },

        /**
         * Generates assignment store
         */
        generateAssignmentStore : function(taskStore, resourceStore) {
            var me = this;
            return generateAssignmentStore(me.makeRandom(), me.getConfig(), taskStore, resourceStore);
        },

        statics : {

            SYLLABLES   : SYLLABLES,
            VERBS       : VERBS,
            NOUNS       : NOUNS,
            PARTS       : PARTS,
            FIRST_NAMES : FIRST_NAMES,
            LAST_NAMES  : LAST_NAMES,
            NAME_MIDS   : NAME_MIDS,

            normalizeDataSpecification  : normalizeDataSpecification,
            generateCalendarName        : generateCalendarName,
            generateTaskName            : generateTaskName,
            generateResourceName        : generateResourceName,
            generateCalendarData        : generateCalendarData,
            generateCalendarManager     : generateCalendarManager,
            generateTaskSegments        : generateTaskSegments,
            generateTaskStore           : generateTaskStore,
            generateDependencyStore     : generateDependencyStore,
            generateResourceStore       : generateResourceStore,
            generateAssignmentStore     : generateAssignmentStore,
            generateData : generateData
        }
    };
}());
