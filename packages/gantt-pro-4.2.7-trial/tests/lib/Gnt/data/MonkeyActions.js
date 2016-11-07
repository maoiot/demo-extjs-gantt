Ext.define('Gnt.data.MonkeyActions', function() {

    function randomTask(random, data, params) {
        var tasks = data.taskStore.toArray();
        tasks.shift(); // no root needed
        return random(tasks);
    }

    function randomRegularTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone();
        }));
    }

    function randomMilestoneTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.isMilestone();
        }));
    }

    function randomSummaryTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return !task.isLeaf() && !task.isRoot() && !(task instanceof Gnt.model.Project);
        }));
    }

    function randomIndentableTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return !!task.previousSibling;
        }));
    }

    function randomOutdentableTask(random, data, params) {
        var root = data.taskStore.getRoot();
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.parentNode && task.parentNode !== root;
        }));
    }

    function randomRegularNonManuallyScheduledTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && !task.isManuallyScheduled();
        }));
    }

    function randomRegularSegmentedTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && task.isSegmented();
        }));
    }

    function randomRegularNonSegmentedTask(random, data, params) {
        return random(Ext.Array.filter(data.taskStore.toArray(), function(task) {
            return task.isLeaf() && !task.isMilestone() && !task.isSegmented();
        }));
    }

    function taskType(taskProp) {
        return function(random, data, params) {
            var task = params[taskProp || 'task'],
                result;

            switch (true) {
            case task instanceof Gnt.model.Project:
                result = 'project';
                break;
            case task.isLeaf() && task.isMilestone():
                result = 'milestone';
                break;
            case task.isLeaf() && task.isSegmented():
                result = 'segmented';
                break;
            case task.isLeaf():
                result = 'regular';
                break;
            default:
                result = 'summary';
                break;
            }

            return result;
        }
    }

    return {
        singleton : true,
        requires : [
            'Gnt.data.Monkey'
        ],

        shiftTask : Gnt.data.Monkey.learn({
            description : "Move [ {[values.task.getName()]} ] task {units} {[ values.units >= 0 ? 'forward' : 'backward' ]}",
            task : randomTask,
            units : function(random, data, params) {
                return random(-10, 10);
            },
            play : function(data, params, next) {
                params.task.shift(params.task.getDurationUnit(), params.units, function() {
                    next();
                });
            }
        }),

        addRegularSubtask : Gnt.data.Monkey.learn({
            description : "Adds a regular subtask to [ {[values.task.getName()]} ] task ({type})",
            task : randomTask,
            type : taskType(),
            play : function(data, params, next) {
                var subtask = new Gnt.model.Task({
                    name      : 'Monkey added regular task',
                    duration  : 5,
                    startDate : params.task.getStartDate(),
                    leaf      : true
                });

                params.task.addSubtask(subtask, function() {
                    next();
                });
            }
        }),

        addSummarySubtask : Gnt.data.Monkey.learn({
            description : "Adds a summary subtask to [ {[values.task.getName()]} ] task ({type})",
            task : randomTask,
            type : taskType(),
            play : function(data, params, next) {
                var subtask = new Gnt.model.Task({
                    name      : 'Monkey added summary task',
                    duration  : 5,
                    startDate : params.task.getStartDate(),
                    children  : [
                        new Gnt.model.Task({
                            name      : 'Monkey added regular task',
                            duration  : 5,
                            startDate : params.task.getStartDate(),
                            leaf      : true
                        }),
                        new Gnt.model.Task({
                            name      : 'Monkey added milestone',
                            startDate : params.task.getStartDate(),
                            endDate   : params.task.getEndDate(),
                            leaf      : true
                        })
                    ]
                });

                params.task.addSubtask(subtask, function() {
                    next();
                });
            }
        }),

        removeTask : Gnt.data.Monkey.learn({
            description : "Remove [ {[values.atask.getName()]} ] task ({atype}) from under [ {[values.btask.getName() ]} ] ({btype})",
            atask : randomTask,
            atype : taskType('atask'),
            btask : function(random, data, params) {
                return params.atask.parentNode;
            },
            btype : taskType('btask'),
            play : function(data, params, next) {
                params.btask.removeSubtask(params.atask, function() {
                    next();
                });
            }
        }),

        removeSummaryTask : Gnt.data.Monkey.learn({
            description : "Remove [ {[values.atask.getName()]} ] summary task from the data store from under [ {[values.btask.getName()]} ] ({btype})",
            atask : randomSummaryTask,
            atype : taskType('atask'),
            btask : function(random, data, params) {
                return params.atask.parentNode;
            },
            btype : taskType('btask'),
            play : function(data, params, next) {
                params.btask.removeSubtask(params.atask, function() {
                    next();
                });
            }
        }),

        moveTaskToAnotherParent : Gnt.data.Monkey.learn({
            description : "Moves ({atype}) [ {[values.atask.getName()]} ] task to (btype) [ {[values.btask.getName()]} ] parent",
            atask : randomTask,
            atype : taskType('atask'),
            btask : function(random, data, params) {
                var tasks, btask;

                tasks = data.taskStore.toArray();
                do {
                    btask = random(tasks);
                }
                while (btask === params.atask.parentNode || btask === params.atask);

                return btask;
            },
            btype : taskType('btask'),
            play : function(data, params, next) {
                params.btask.addSubtask(params.atask, function() {
                    next();
                });
            }
        }),

        indentTask : Gnt.data.Monkey.learn({
            description : "Indent [ {[values.atask.getName()]} ] ({atype}) task under ({btype}) [ {[values.btask.getName()]} ] task",
            atask : randomIndentableTask,
            atype : taskType('atask'),
            btask : function(random, data, params) {
                return params.atask.previousSibling;
            },
            btype : taskType('btask'),
            play : function(data, params, next) {
                params.atask.indent(function() {
                    next();
                });
            }
        }),

        outdentTask : Gnt.data.Monkey.learn({
            description : "Outdent [ {[values.atask.getName()]} ] ({atype}) task under from ({btype}) [ {[values.btask.getName()]} ] task",
            atask : randomIndentableTask,
            atype : taskType('atask'),
            btask : function(random, data, params) {
                return params.atask.parentNode;
            },
            btype : taskType('btask'),
            play : function(data, params, next) {
                params.atask.outdent(function() {
                    next();
                });
            }
        }),

        changeTaskStartDate : Gnt.data.Monkey.learn({
            description : "Change [ {[values.atask.getName()]} ] task start date from {from:date} to {to:date}",
            atask : randomRegularTask,
            from : function(random, data, params) {
                return params.atask.getStartDate();
            },
            to   : function(random, data, params) {
                var task = params.atask,
                    d = new Date(task.getStartDate());

                return Ext.Date.add(d, task.getDurationUnit(), random(-10, 0));
            },
            play : function(data, params, next) {
                params.atask.setStartDate(params.to, false, true, function() {
                    next();
                });
            }
        }),

        changeTaskEndDate : Gnt.data.Monkey.learn({
            description : "Change [ {[values.atask.getName()]} ] task end date from {from:date} to {to:date}",
            atask : randomRegularTask,
            from : function(random, data, params) {
                return params.atask.getEndDate();
            },
            to   : function(random, data, params) {
                var task = params.atask,
                    d = new Date(task.getStartDate());

                return Ext.Date.add(d, task.getDurationUnit(), random(1, 11));
            },
            play : function(data, params, next) {
                params.atask.setEndDate(params.to, false, true, function() {
                    next();
                });
            }
        }),

        changeTaskDuration : Gnt.data.Monkey.learn({
            description : "Change [ {[values.atask.getName()]} ] task duration from {from} to {to}",
            atask : randomRegularTask,
            from : function(random, data, params) {
                return params.atask.getDuration();
            },
            to : function(random, data, params) {
                var to;
                do {
                    to = random(1, 11);
                }
                while (to == params.atask.getDuration());

                return to;
            },
            play : function(data, params, next) {
                params.atask.setDuration(params.to, params.atask.getDurationUnit(), function() {
                    next();
                });
            }
        }),

        convertMilestoneToRegularTask : Gnt.data.Monkey.learn({
            description : "Convert milestone [ {[values.task.getName()]} ] to regular task",
            task : randomMilestoneTask,
            play : function(data, params, next) {
                params.task.convertToRegular(function() {
                    next();
                });
            }
        }),

        convertRegularTaskToMilestone : Gnt.data.Monkey.learn({
            description : "Convert regular task [ {[values.task.getName()]} ] to milestone",
            task : randomRegularTask,
            play : function(data, params, next) {
                params.task.convertToMilestone(function() {
                    next();
                });
            }
        }),

        // Change task scheduling mode
        changeTaskSchedulingMode : Gnt.data.Monkey.learn({
            description : "Change regular task [ {[values.atask.getName()]} ] scheduling mode from {mode} to {newMode}",
            atask : randomRegularTask,
            mode : function(random, data, params) {
                return params.atask.getSchedulingMode();
            },
            newMode : function(random, data, params) {
                var newMode;

                do {
                    newMode = random(['Normal', 'FixedDuration', 'EffortDriven', 'DynamicAssignment']);
                } while (params.atask.getSchedulingMode() == newMode);

                return newMode;
            },
            play : function(data, params, next) {
                params.atask.setSchedulingMode(params.newMode, function() {
                    next();
                });
            }
        }),

        // Change task scheduling to manual
        changeTaskSchedulingModeToManual : Gnt.data.Monkey.learn({
            description : "Change regular task [ {[values.atask.getName()]} ] scheduling mode to Manual from {mode}",
            atask : randomRegularNonManuallyScheduledTask,
            mode  : function(random, data, params) {
                return params.atask.getSchedulingMode();
            },
            play : function(data, params, next) {
                params.atask.setManuallyScheduled(true);
                next();
            }
        }),

        // Join task segments
        joinSegmentedTask : Gnt.data.Monkey.learn({
            description : "Join segmented task [ {[values.atask.getName()]} ]",
            atask       : randomRegularSegmentedTask,
            play        : function(data, params, next) {
                params.atask.setSegments([], function() {
                    next();
                });
            }
        }),

        // Segment a leaf task
        segmentLeafTask : Gnt.data.Monkey.learn({
            description : "Segment leaf task [ {[values.atask.getName()]} ] by 2",
            atask       : randomRegularNonSegmentedTask,
            play        : function(data, params, next) {
                params.atask.setSegments([{
                    StartDate : params.atask.getStartDate(),
                    Duration  : params.atask.getDuration() * 0.4
                }, {
                    StartDate : Ext.Date.add(params.atask.getEndDate(), Ext.Date.DAY, -params.atask.getDuration() * 0.4),
                    Duration  : params.atask.getDuration() * 0.4
                }], function() {
                    next();
                });
            }
        }),

        // Change particular segment duration
        changeSegmentDuration : Gnt.data.Monkey.learn({
            description : "Change task [ {[values.atask.getName()]} ] {bsegNum} segment duration from {from} to {to}",
            atask       : randomRegularSegmentedTask,
            bsegNum     : function(random, data, params) {
                return random(0, params.atask.getSegments().length);
            },
            from : function(random, data, params) {
                return params.atask.getSegment(params.bsegNum).getDuration();
            },
            to : function(random, data, params) {
                var to;
                do {
                    to = random(1, 11);
                }
                while (to == params.atask.getSegment(params.bsegNum).getDuration());

                return to;
            },
            play : function(data, params, next) {
                var segment = params.atask.getSegment(params.bsegNum);
                segment.setDuration(params.to, segment.getDurationUnit(), function() {
                    next();
                });
            }
        })/*,

        // Setup task constraints and violate them
        setupAndViolateConstraint : Gnt.data.Monkey.learn({
            description : "Setup { constrainType } { constrainDate } constrain on [ {[values.atask.getName()]} ] { ataskType } task and violate it by moving top level [ {[values.btask.getName()]} ] { btaskType } task but keeping constrained task at marginal (non violating) date",
            atask : null,
            ataskType : null,
            btask : null,
            btaskType : null,
            constrainType : null,
            constrainDate : null,
            play : function(data, params, next) {
            }
        })*/

        // Setup task constraints and violate them with remove constraint

        // Setup task constraints and violate them with canceling changes

        // Continue with calendar manager actions

        // Continue with dependency store actions

        // Continue with resource store actions

        // Continue with assignment store actions
    }
});
