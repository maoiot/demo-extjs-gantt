StartTest(function(t) {

    function getBoxConnectionPoint(box, side, shift, arrowSize) {
        var point = {};

        switch (side) {
        case 'left':
            point.x = box.start - arrowSize;
            point.y = (box.top + box.bottom) / 2 + shift;
            break;
        case 'right':
            point.x = box.end + arrowSize;
            point.y = (box.top + box.bottom) / 2 + shift;
            break;
        case 'top':
            point.x = (box.start + box.end) / 2 + shift;
            point.y = box.top - arrowSize;
            break;
        case 'bottom':
            point.x = (box.start + box.end) / 2 + shift;
            point.y = box.bottom + arrowSize;
            break;
        }

        return point;
    }

    function checkLineData(t, pathFinder, lineDef, lineSegmentsData, expectSegments) {
        var startConnPoint,
            endConnPoint,
            firstSegment,
            lastSegment,
            isLineContinous,
            i;

        t.ok(lineSegmentsData, "Path found");

        if (lineSegmentsData) {
            lineDef = Ext.apply({}, lineDef, pathFinder.getConfig());

            startConnPoint = getBoxConnectionPoint(lineDef.startBox, lineDef.startSide, lineDef.startShift, lineDef.startArrowSize);
            endConnPoint   = getBoxConnectionPoint(lineDef.endBox, lineDef.endSide, lineDef.endShift, lineDef.endArrowSize);

            firstSegment = lineSegmentsData[0];
            lastSegment  = lineSegmentsData[lineSegmentsData.length - 1];

            // checking line length
            t.is(lineSegmentsData.length, expectSegments, "Line contain expected amount of segments");

            // checking line start
            t.ok(
                startConnPoint.x === firstSegment.x1 && startConnPoint.y === firstSegment.y1,
                "Line starts at correct start point"
            );

            // checking line end
            t.ok(
                endConnPoint.x === lastSegment.x2 && endConnPoint.y === lastSegment.y2,
                "Line ends at correct end point"
            );

            // checking line connectivity
            for (i = 1, isLineContinous = true; isLineContinous && i < lineSegmentsData.length; ++i) {
                isLineContinous =
                    (lineSegmentsData[i-1].x2 === lineSegmentsData[i].x1) &&
                    (lineSegmentsData[i-1].y2 === lineSegmentsData[i].y1);
            }

            t.ok(isLineContinous, "Line is continous, i.e. it has no gaps");
        }
    }

    function drawConnection(pathFinderConfig, lineDef) {
        var body = Ext.getBody(),
            painter,
            lineContEl;

        body.createChild({
            tag    : 'div',
            style  : {
                position : 'absolute',
                //border   : '1px solid black',
                border   : '0px none',
                backgroundColor: 'orange',
                top      : lineDef.startBox.top + 'px',
                left     : lineDef.startBox.start + 'px',
                width    : (lineDef.startBox.end - lineDef.startBox.start) + 'px',
                height   : (lineDef.startBox.bottom - lineDef.startBox.top) + 'px'
            }
        });

        body.createChild({
            tag    : 'div',
            style  : {
                position : 'absolute',
                //border   : '1px solid black',
                border   : '0px none',
                backgroundColor: 'orange',
                top      : lineDef.endBox.top + 'px',
                left     : lineDef.endBox.start + 'px',
                width    : (lineDef.endBox.end - lineDef.endBox.start) + 'px',
                height   : (lineDef.endBox.bottom - lineDef.endBox.top) + 'px'
            }
        });

        lineDef.otherBoxes && Ext.Array.forEach(lineDef.otherBoxes, function(box) {
            body.createChild({
                tag    : 'div',
                style  : {
                    position : 'absolute',
                    //border   : '1px solid black',
                    border   : '0px none',
                    backgroundColor: 'red',
                    top      : box.top + 'px',
                    left     : box.start + 'px',
                    width    : (box.end - box.start) + 'px',
                    height   : (box.bottom - box.top) + 'px'
                }
            });
        });

        lineContEl = body.createChild({
            tag : 'div',
            style : 'position:absolute'
        });

        painter = new Sch.view.dependency.Painter({
            pathFinderConfig : pathFinderConfig
        });

        lineContEl.setHtml(painter.generatePaintMarkup(lineDef));
    }

    t.describe("Rectangular path finder takes a line specification and divides it into a list of segments consisting a line", function(t) {

        t.it("It should properly segment a line with minimal amount of segments possible regardles of line's boxes connection sides", function(t) {
            //
            //        +---------+  1 segment   +----------+
            //     +--|         |------------->|-shift    |<-+
            //     |  +---------+              |          |  |
            //     |               5 segments  +----------+  |
            //     +-----------------------------------------+
            var pathFinder,
                lineDef,
                lineSegmentsData,
                testPlan;

            pathFinder = new Sch.util.RectangularPathFinder({
                verticalMargin : 10
            });

            lineDef = {
                startBox   : { top: 100, start : 100, bottom : 250, end : 250 },
                endBox     : { top: 100, start : 400, bottom : 300, end : 550 },
                endShift   : -25
            };

            // start side - end side - segments amount
            testPlan = {
                'left' : {
                    'left'   : 5,
                    'right'  : 5,
                    'top'    : 4,
                    'bottom' : 4
                },
                'right' : {
                    'left'   : 1,
                    'right'  : 5,
                    'top'    : 4,
                    'bottom' : 4
                },
                'top' : {
                    'left'   : 4,
                    'right'  : 4,
                    'top'    : 3,
                    'bottom' : 5
                },
                'bottom' : {
                    'left'   : 4,
                    'right'  : 4,
                    'top'    : 5,
                    'bottom' : 3
                }
            };

            Ext.Object.each(testPlan, function(startSide, endSideTestPlan) {
                Ext.Object.each(endSideTestPlan, function(endSide, expectedSegments) {
                    lineDef.startSide = startSide;
                    lineDef.endSide   = endSide;
                    lineSegmentsData = pathFinder.findPath(lineDef);
                    t.diag("From " + startSide + " to " + endSide + " expect segments " + expectedSegments);
                    checkLineData(t, pathFinder, lineDef, lineSegmentsData, expectedSegments);
                });
            });
        });

        t.it("Should support advanced pathfinding", function(t) {
            //                    +---+--------------------+
            //     +-------+      |***|********************|
            //  +--+       |      |***+---------------+----+
            //  |  +-------+      |***|   +------+    |****|
            //  |                 |***| +>|      |    |****|
            //  |                 |***| | +------+    +----+
            //  |                 |***| +-+------+------------+
            //  |                 |***+--------------------+  |
            //  |                 |***|********************|  |
            //  |                 +---+--------------------+  |
            //  +---------------------------------------------+
            var pathFinder,
                lineDef,
                lineSegmentsData;

            pathFinder = new Sch.util.RectangularPathFinder({
                verticalMargin : 10
            });

            lineDef = {
                startBox   : { top : 50,  start : 50,  bottom : 100, end : 100 },
                endBox     : { top : 125, start : 300, bottom : 225, end : 350 },
                otherBoxes : [
                    { top : 50,  start: 200, bottom: 300, end : 250 },
                    { top : 50,  start: 250, bottom: 100, end : 500 },
                    { top : 250, start: 250, bottom: 300, end : 500 },
                    { top : 100, start: 450, bottom: 225, end : 500 }
                ]
            };

            //drawConnection(pathFinder.getConfig(), lineDef);

            checkLineData(t, pathFinder, lineDef, pathFinder.findPath(lineDef), 7);
        });

        t.it("Should properly report when path could not be found", function(t) {
            //                    +---+--------------------+
            //     +-------+      |***|********************|
            //  +--+       |      |***+---------------+----+
            //  |  +-------+      |***|   +------+    |****|
            //  |                 |***|   |      |    |****|
            //  |                 |***|   +------+    |****|
            //  |                 |***|               |****|  X
            //  |                 |***+---------------+----+  |
            //  |                 |***|********************|  |
            //  |                 +---+--------------------+  |
            //  +---------------------------------------------+
            var pathFinder,
                lineDef,
                lineSegmentsData;

            pathFinder = new Sch.util.RectangularPathFinder({
                verticalMargin : 10
            });

            lineDef = {
                startBox   : { top : 50,  start : 50,  bottom : 100, end : 100 },
                endBox     : { top : 125, start : 300, bottom : 225, end : 350 },
                otherBoxes : [
                    { top : 50,  start: 200, bottom: 300, end : 250 },
                    { top : 50,  start: 250, bottom: 100, end : 500 },
                    { top : 250, start: 250, bottom: 300, end : 500 },
                    { top : 100, start: 450, bottom: 250, end : 500 }
                ]
            };

            //drawConnection(pathFinder.getConfig(), lineDef);

            t.throwsOk(function() {
                pathFinder.findPath(lineDef);
            }, 'Path could not be found for line definition');

        });
    });
});
