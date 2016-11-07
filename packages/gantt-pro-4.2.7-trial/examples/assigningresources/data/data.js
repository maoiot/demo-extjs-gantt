{
    "success"      : true,
    "dependencies" : {
        "rows" : []
    },
    "assignments"  : {
        "rows" : [
            {
                "Id"         : 1111,
                "ResourceId" : 1,
                "TaskId"     : 13,
                "Units"      : 80
            },
            {
                "Id"         : 1,
                "ResourceId" : 1,
                "TaskId"     : 2,
                "Units"      : 40
            },
            {
                "Id"         : 2,
                "ResourceId" : 1,
                "TaskId"     : 3,
                "Units"      : 30
            },
            {
                "Id"         : 3,
                "ResourceId" : 2,
                "TaskId"     : 2,
                "Units"      : 20
            },
            {
                "Id"         : 4,
                "ResourceId" : 2,
                "TaskId"     : 3,
                "Units"      : 20
            },
            {
                "Id"         : 5,
                "ResourceId" : 2,
                "TaskId"     : 4,
                "Units"      : 60
            },
            {
                "Id"         : 6,
                "ResourceId" : 3,
                "TaskId"     : 3,
                "Units"      : 10
            },
            {
                "Id"         : 7,
                "ResourceId" : 3,
                "TaskId"     : 4,
                "Units"      : 20
            },
            {
                "Id"         : 8,
                "ResourceId" : 3,
                "TaskId"     : 5,
                "Units"      : 60
            },
            {
                "Id"         : 9,
                "ResourceId" : 4,
                "TaskId"     : 4,
                "Units"      : 20
            },
            {
                "Id"         : 10,
                "ResourceId" : 4,
                "TaskId"     : 5,
                "Units"      : 30
            },
            {
                "Id"         : 12,
                "ResourceId" : 5,
                "TaskId"     : 5,
                "Units"      : 30
            },
            {
                "Id"         : 14,
                "ResourceId" : 5,
                "TaskId"     : 7,
                "Units"      : 60
            },
            {
                "Id"         : 16,
                "ResourceId" : 6,
                "TaskId"     : 7,
                "Units"      : 50
            },
            {
                "Id"         : 17,
                "ResourceId" : 6,
                "TaskId"     : 8,
                "Units"      : 30
            },
            {
                "Id"         : 18,
                "ResourceId" : 7,
                "TaskId"     : 7,
                "Units"      : 50
            },
            {
                "Id"         : 19,
                "ResourceId" : 7,
                "TaskId"     : 8,
                "Units"      : 50
            },
            {
                "Id"         : 20,
                "ResourceId" : 7,
                "TaskId"     : 9,
                "Units"      : 30
            },
            {
                "Id"         : 21,
                "ResourceId" : 8,
                "TaskId"     : 8,
                "Units"      : 30
            },
            {
                "Id"         : 22,
                "ResourceId" : 8,
                "TaskId"     : 9,
                "Units"      : 20
            },
            {
                "Id"         : 24,
                "ResourceId" : 9,
                "TaskId"     : 9,
                "Units"      : 50
            },
            {
                "Id"         : 26,
                "ResourceId" : 9,
                "TaskId"     : 11,
                "Units"      : 60
            },
            {
                "Id"         : 28,
                "ResourceId" : 10,
                "TaskId"     : 11,
                "Units"      : 30
            },
            {
                "Id"         : 29,
                "ResourceId" : 10,
                "TaskId"     : 12,
                "Units"      : 20
            }
        ]
    },
    "resources" : {
        "rows" : [
            {
                "Id"   : 1,
                "Name" : "Mats"
            },
            {
                "Id"   : 2,
                "Name" : "Nickolay"
            },
            {
                "Id"   : 3,
                "Name" : "Goran"
            },
            {
                "Id"   : 4,
                "Name" : "Dan"
            },
            {
                "Id"   : 5,
                "Name" : "Jake"
            },
            {
                "Id"   : 6,
                "Name" : "Kim"
            },
            {
                "Id"   : 7,
                "Name" : "Bart"
            },
            {
                "Id"   : 8,
                "Name" : "Tony"
            },
            {
                "Id"   : 9,
                "Name" : "Magnus"
            },
            {
                "Id"   : 10,
                "Name" : "Rolf"
            }
        ]
    },
    "tasks" : {
        "rows"  : [
            {
                "Id"          : 1,
                "Name"        : "Planning",
                "PercentDone" : 50,
                "StartDate"   : "2010-01-18",
                "Duration"    : 5,
                "expanded"    : true,
                "children"    : [
                    {
                        "Id"          : 2,
                        "leaf"        : true,
                        "Name"        : "Investigate",
                        "PercentDone" : 50,
                        "StartDate"   : "2010-01-18",
                        "Duration"    : 5
                    },
                    {
                        "Id"          : 3,
                        "leaf"        : true,
                        "Name"        : "Assign resources",
                        "PercentDone" : 50,
                        "StartDate"   : "2010-01-18",
                        "Duration"    : 5
                    },
                    {
                        "Id"          : 4,
                        "leaf"        : true,
                        "Name"        : "Gather documents",
                        "PercentDone" : 50,
                        "StartDate"   : "2010-01-18",
                        "Duration"    : 5
                    },
                    {
                        "Id"          : 5,
                        "leaf"        : true,
                        "Name"        : "Report to management",
                        "PercentDone" : 0,
                        "StartDate"   : "2010-01-23",
                        "Duration"    : 0
                    }
                ]
            },
            {
                "Id"          : 6,
                "Name"        : "Implementation Phase 1",
                "PercentDone" : 40,
                "StartDate"   : "2010-01-25",
                "Duration"    : 5,
                "expanded"    : true,
                "children"    : [
                    {
                        "Id"          : 7,
                        "leaf"        : true,
                        "Name"        : "Preparation work",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-01-25",
                        "Duration"    : 5
                    },
                    {
                        "Id"          : 8,
                        "leaf"        : true,
                        "Name"        : "Evaluate chipsets",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-01-25",
                        "Duration"    : 5
                    },
                    {
                        "Id"          : 9,
                        "leaf"        : true,
                        "Name"        : "Choose technology",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-01-25",
                        "Duration"    : 5
                    }
                ]
            },
            {
                "Id"          : 10,
                "Name"        : "Build prototype",
                "PercentDone" : 40,
                "expanded"    : true,
                "StartDate"   : "2010-02-01",
                "Duration"    : 5,
                "children"    : [
                    {
                        "Id"          : 11,
                        "leaf"        : true,
                        "Name"        : "Step 1",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-02-01",
                        "Duration"    : 5,
                        "Segments"    : [
                            {
                                "Id"        : 1,
                                "StartDate" : "2010-02-01",
                                "Duration"  : 3
                            },
                            {
                                "Id"        : 2,
                                "StartDate" : "2010-02-05",
                                "Duration"  : 1
                            }
                        ]
                    },
                    {
                        "Id"          : 12,
                        "leaf"        : true,
                        "Name"        : "Step 2",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-02-01",
                        "Duration"    : 5,
                        "Segments"    : [
                            {
                                "Id"        : 1,
                                "StartDate" : "2010-02-01",
                                "Duration"  : 3
                            },
                            {
                                "Id"        : 2,
                                "StartDate" : "2010-02-05",
                                "Duration"  : 1
                            }
                        ]
                    },
                    {
                        "Id"          : 13,
                        "leaf"        : true,
                        "Name"        : "Step 3",
                        "PercentDone" : 40,
                        "StartDate"   : "2010-02-01",
                        "Duration"    : 5,
                        "Segments"    : [
                            {
                                "Id"        : 1,
                                "StartDate" : "2010-02-01",
                                "Duration"  : 3
                            },
                            {
                                "Id"        : 2,
                                "StartDate" : "2010-02-05",
                                "Duration"  : 1
                            }
                        ]
                    },
                    {
                        "Id"        : 14,
                        "leaf"      : true,
                        "Name"      : "Follow up",
                        "StartDate" : "2010-02-06",
                        "Duration"  : 0
                    }
                ]
            }
        ]
    }
}