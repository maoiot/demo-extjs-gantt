StartTest(function(t) {

    var Type = Gnt.model.Dependency.Type,
        rtl  = t.url.match('rtl'),
        gantt;

    t.expectGlobals('MyTask');

    Ext.define('MyTask', {
        extend : 'Gnt.model.Task',

        fields : [
            { name : 'Milestone', type : 'boolean' }
        ],

        isMilestone : function () {
            return this.get('Milestone');
        }
    });

    t.beforeEach(function(){
        gantt && gantt.destroy();
    });

    // 1. Figure out direction based on start XY
    // 2. Walk until next xy point is not the same el, OR it's a dependency arrow
    // 3. If it's not an arrow, figure out which direction to go, repeat #2

    var Walker = function(t, ganttPanel, dependency) {

        Ext.apply(this, {
            dependencyRecord        : dependency,
            dir                     : null,
            steps                   : 0,
            getNextPoint            : function(x, y) {
                switch(this.dir) {
                    case 'l': return [x-1, y];
                    case 'r': return [x+1, y];
                    case 'u': return [x, y-1];
                    case 'd': return [x, y+1];
                }
            },

            // For debugging
            markPixel : function(x, y) {
//                Ext.getBody().createChild({
//                    style : 'background:black;width:1px;height:1px;position:absolute;top:' + y + 'px;left:' + x + 'px'
//                });
            },

            getStartPoint  : function () {
                var taskEl = ganttPanel.getSchedulingView().getElementFromEventRecord(this.dependencyRecord.getSourceTask());
                var xy = taskEl.getXY();
                var dir, found = false;

                if (ganttPanel.rtl) {
                    if (this.dependencyRecord.getType() === Type.StartToEnd ||
                        this.dependencyRecord.getType() === Type.StartToStart) {
                        dir = 'r';
                        xy[0] += taskEl.getWidth() + 2;
                    } else {
                        dir = 'l';
                        // IE9/10 fail to lookup dependency in rtl gantt like normal browsers
                        if (Ext.isIE) {
                            xy[0] -= 3;
                        } else {
                            xy[0] -= 2;
                        }
                    }
                } else {
                    if (this.dependencyRecord.getType() === Type.EndToEnd ||
                        this.dependencyRecord.getType() === Type.EndToStart) {
                        dir = 'r';
                        xy[0] += taskEl.getWidth() + 2;
                    } else {
                        dir = 'l';
                        xy[0] -= 2;
                    }
                }

                // Locate the dependency start point
                for (var i = 0; i < taskEl.getHeight(); i++) {
                    var secondaryXPosition = xy[0] + (rtl ? -1 : 1);
                    var elAtPoint = document.elementFromPoint(xy[0], xy[1]+i);
                    var elAtPoint2 = document.elementFromPoint(secondaryXPosition, xy[1]+i);

                    if (elAtPoint.className.match('sch-dependency')) {
                        xy[1] = xy[1]+i;
                        found = true;
                        break;
                    } else if (elAtPoint2.className.match('sch-dependency')) {
                        xy[0] = secondaryXPosition;
                        xy[1] = xy[1]+i;
                        found = true;
                        break;
                    }
                }

                t.ok(found, 'Found start point of dependency next to task element');

                t.isApprox(i, (taskEl.getHeight()/2), 2, 'Outgoing dependency line vertically centered');

                return {
                    dir : dir,
                    x   : xy[0],
                    y   : xy[1]
                };
            },

            getNewDirection : function (x, y) {
                var dir, el;

                if (this.dir === 'l' || this.dir === 'r') {
                    el = Ext.Element.fromPoint(x, y-4);

                    if (el.hasCls('sch-dependency')) {
                        dir = 'u';
                    } else {
                        dir = 'd';
                    }
                }
                else {
                    el = Ext.Element.fromPoint(x-4, y);

                    if (el.hasCls('sch-dependency')) {
                        dir = 'l';
                    } else {
                        dir = 'r';
                    }
                }

                return dir;
            },

            isTaskEl : function (el) {
                return el.className.match('sch-gantt-item') || Ext.fly(el).up('.sch-gantt-item');
            },

            findTaskElement : function (x, y) {
                var el = document.elementFromPoint(x, y);
                var box = [[1,1], [1,-1], [-1,-1], [-1,1]];
                for (var i = 0, l = box.length; i < l && !this.isTaskEl(el); i++) {
                    el = document.elementFromPoint(x + box[i][0], y + box[i][1]);
                }
                return el;
            },

            walkToArrow: function (x, y) {
                if (Ext.isIE8m) return;

                if (!this.dir) {
                    var point = this.getStartPoint();
                    this.dir = point.dir;
                    x = point.x;
                    y = point.y;
                }

                if (this.steps < 500) {
                    this.steps++;
                } else {
                    t.fail('Too many steps');
                    return null;
                }

                var elAtCurrentPoint = document.elementFromPoint(x, y);
                var nextPoint = this.getNextPoint(x, y);
                var nextEl    = document.elementFromPoint.apply(document, nextPoint);

                this.markPixel(x, y);

                if (!Ext.fly(elAtCurrentPoint).hasCls('sch-dependency')) {
                    t.fail('Step: ' + this.steps + ': Gap found at ' + x + ',' + y);
                    return null;
                }

                if (Ext.fly(nextEl).hasCls('sch-dependency-arrow')) {
                    this.markPixel(nextPoint[0], nextPoint[1]);

                    t.pass('Was able to walk to the arrow');

                    var xy = [x, y];
                    var i = 0;
                    var node = nextEl;

                    while(node.className.match('sch-dependency-arrow') || i < 1) {
                        xy = this.getNextPoint(xy[0], xy[1]);

                        node = document.elementFromPoint.apply(document, xy);

                        if (!node.className.match('sch-dependency-arrow')) {
                            i++;
                        }
                    }

                    // step one extra pixel in the same direction
                    // this fixes one failure in FF
                    xy          = this.getNextPoint(xy[0], xy[1]);

                    var el = document.elementFromPoint(xy[0], xy[1]);

                    // In IE after dependency refactoring task cannot be found by exact coordinates, need to look
                    // in 1px box around
                    if (!this.isTaskEl(el)) {
                        el = this.findTaskElement(xy[0], xy[1]);
                    }

                    return {
                        arrowEl         : nextEl,
                        targetTaskEl    : el
                    };
                }

                if (elAtCurrentPoint === nextEl) {
                    // Keep walking same direction
                    return this.walkToArrow(nextPoint[0], nextPoint[1]);
                } else {
                    // New direction
                    this.dir = this.getNewDirection(x, y);
                    var nextXY = this.getNextPoint(x, y);
                    // Sometimes element from point returns the same element as elAtCurrentPoint even if we have changed
                    // the direction and element thikness is 0 (just border left)
                    while (elAtCurrentPoint == document.elementFromPoint(nextXY[0], nextXY[1])) {
                        nextXY = this.getNextPoint(nextXY[0], nextXY[1]);
                    }
                    return this.walkToArrow(nextXY[0], nextXY[1]);
                }
            },

            verifyTaskBar : function(gantt, result, taskId) {
                if (Ext.isIE8m) return;

                var el = result.targetTaskEl;
                var taskEl = el.className.match('sch-gantt-item') ? Ext.get(el) : Ext.fly(el).up('.sch-gantt-item');

                var task = taskEl && gantt.getSchedulingView().resolveTaskRecord(taskEl);

                t.ok(task, 'Found a task after the arrow');
                t.is(task && task.data.Id, taskId, 'Found target task');
            },

            verifyLinesAndArrow : function(gantt, data) {
                if (Ext.isIE8m) return;

                var dir = data.dir;

                if (rtl) {
                    if      (dir === 'left') dir = 'right';
                    else if (dir === 'right') dir = 'left';
                }

                t.is(gantt.el.select('.sch-dependency-line').getCount(), data.nbrLines, 'Should find ' + data.nbrLines + ' lines');
                t.is(gantt.el.select('.sch-dependency-arrow-' + dir).getCount(), data.nbrArrows || 1, 'Should find arrow pointing ' + dir);
            }
        });
    };

    // ------ EOF SETUP
    var getGantt = function (config) {
        var g = t.getGantt2({
            width               : 200,
            height              : 350,
            forceFit            : true,
            style               : 'float:left',
            renderTo            : Ext.getBody(),
            startDate           : new Date(2010, 1, 1),
            endDate             : new Date(2010, 1, 11),
            rtl                 : rtl,
            viewConfig          : {
                deferInitialRefresh     : false,
                dependencyViewConfig    : { lineWidth : 2 }
            },
            dependencyStore     : t.getDependencyStore(Ext.apply({
                data : config.dependencies
            }, config.dependencyStore)),
            taskStore           : new Gnt.data.TaskStore(Ext.apply({
                root : { children : config.tasks }
            }, config.taskStore)),
            enableDependencyDragDrop : false, // Somehow terminal elements started to be on the way for walker,
            dependencyViewConfig : {
                painterConfig : {
                    realLineThikness : 0
                }
            }
        });

        // Put dependencies above tasks
        g.el.select('.sch-event-wrap').setStyle('z-index', 0);

        return g;
    };


    // The number of dependencies to generate
    // We make N dependencies of the same type instead of making only one since there was an issue
    // when dependencies were mistakenly shifted and the shift grew from the 1st row to further ones
    var recordsMultiplier = 5;

    function genRows(fn, timesToCall) {
        var result = [];

        for (var i = 0; i < timesToCall; i ++) {
            result.push.apply(result, fn(result.length));
        }

        return result;
    }


    function It (config) {

        config.nbrArrows = config.nbrArrows || recordsMultiplier;

        t.it(config.desc, function (t) {

            if (typeof config.tasks == 'function') {
                config.tasks = genRows(config.tasks, recordsMultiplier);
            }

            if (typeof config.dependencies == 'function') {
                config.dependencies = genRows(config.dependencies, recordsMultiplier);
            }

            gantt = getGantt(config);

            t.waitForTasksAndDependenciesToRender(gantt, function () {

                var walker;

                gantt.dependencyStore.each(function (dep) {
                    walker = new Walker(t, gantt, dep);
                    var result = walker.walkToArrow();
                    walker.verifyTaskBar(gantt, result, dep.getTargetId());
                })

                walker.verifyLinesAndArrow(gantt, config);
            })
        });

    }


    It({
        desc  : 'End to Start, 2 lines',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 3), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 5), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2 + 1, To : len*2 + 2, Type : Type.EndToStart }];
        },
        nbrLines : 2*recordsMultiplier,
        dir      : 'down'
    });

    It({
        desc  : 'End to Start, target before/below source',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 5), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 3), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2 + 1, To : len*2 + 2, Type : Type.EndToStart }];
        },
        nbrLines : 5*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to Start, target before/above source',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 3), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 7), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2 + 2, To : len*2 + 1, Type : Type.EndToStart }];
        },
        nbrLines : 5*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to Start, target after/above source',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 9), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 2), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2 +2, To : len*2 +1, Type : Type.EndToStart }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to Start, milestones',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 9), Duration : 0 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 9), Duration : 0 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.EndToStart }];
        },
        nbrLines : 5*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to Start, milestones w/ non-zero duration',

        taskStore : {
            model : 'MyTask'
        },

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 9), Duration : 2, Milestone : true },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 9), Duration : 2, Milestone : true }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.EndToStart }];
        },
        nbrLines : 5*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to Start, zero width',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 9), Duration : 1, DurationUnit : 'mi' },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 9, 0, 1), Duration : 1, DurationUnit : 'mi' }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2 + 1, To : len*2 + 2, Type : Type.EndToStart }];
        },
        nbrLines : 2*recordsMultiplier,
        dir      : 'down'
    });

    It({
        desc  : 'Start to Start',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 6), Duration : 5 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 6), Duration : 5 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.StartToStart}];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'Start to Start 2',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 6), Duration : 5 },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 6), Duration : 5 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.StartToStart }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'Start to Start Milestone',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 6), Duration : 0 },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 6), Duration : 0 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.StartToStart }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'Start to Start Milestone w/ non-zero duration',

        taskStore : {
            model : 'MyTask'
        },

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 6), Duration : 2, Milestone : true },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 6), Duration : 2, Milestone : true }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.StartToStart }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'Start to Start',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 6), Duration : 5 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 8), Duration : 5 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.StartToStart }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'right'
    });

    It({
        desc  : 'End to End',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 4), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [{ From : len*2+1, To : len*2+2, Type : Type.EndToEnd }];
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'End to End 2',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 4), Duration : 2 },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.EndToEnd} ]
        },
        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'End to End 3: Milestones',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 4), Duration : 0 },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 0 }
            ];
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.EndToEnd } ]
        },

        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'End to End 3: Milestones w/ non-zero duration',

        taskStore : {
            model : 'MyTask'
        },

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 4), Duration : 2, Milestone : true },
                { leaf : false, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2, Milestone : true }
            ];
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.EndToEnd } ]
        },

        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'Start to End',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 4), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.StartToEnd} ]
        },

        nbrLines : 5*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'Start to End, target below, before source',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 10), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2 }
            ];
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.StartToEnd} ]
        },

        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'Start to End, milestone',

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 10), Duration : 0 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 0 }
            ]
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.StartToEnd} ]
        },

        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });

    It({
        desc  : 'Start to End, milestone w/ non-zero duration',

        taskStore : {
            model : 'MyTask'
        },

        tasks : function (len) {
            return [
                { leaf : true, Id : len+1, StartDate : new Date(2010, 1, 10), Duration : 2 },
                { leaf : true, Id : len+2, StartDate : new Date(2010, 1, 4), Duration : 2 }
            ]
        },
        dependencies : function (len) {
            return [ { From : len*2+1, To : len*2+2, Type : Type.StartToEnd} ]
        },

        nbrLines : 3*recordsMultiplier,
        dir      : 'left'
    });
});
