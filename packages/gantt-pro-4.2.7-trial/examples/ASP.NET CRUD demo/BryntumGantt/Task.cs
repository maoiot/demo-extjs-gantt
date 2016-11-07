//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Bryntum.Gantt
{
    using System;
    using System.Collections.Generic;
    
    public partial class Task
    {
        public Task()
        {
            this.Draggable = true;
            this.Resizable = true;
            this.Assignments = new HashSet<Assignment>();
            this.Predecessors = new HashSet<Dependency>();
            this.Successors = new HashSet<Dependency>();
            this.ChildrenRaw = new HashSet<Task>();
            this.Segments = new HashSet<TaskSegment>();
        }
    
        public override int Id { get; set; }
        public override Nullable<int> parentIdRaw { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<decimal> Duration { get; set; }
        public string DurationUnit { get; set; }
        public Nullable<int> PercentDone { get; set; }
        public string SchedulingMode { get; set; }
        public Nullable<System.DateTime> BaselineStartDate { get; set; }
        public Nullable<System.DateTime> BaselineEndDate { get; set; }
        public Nullable<int> BaselinePercentDone { get; set; }
        public string Cls { get; set; }
        public Nullable<int> CalendarIdRaw { get; set; }
        public Nullable<int> index { get; set; }
        public bool expanded { get; set; }
        public Nullable<decimal> Effort { get; set; }
        public string EffortUnit { get; set; }
        public string Note { get; set; }
        public string ConstraintType { get; set; }
        public Nullable<System.DateTime> ConstraintDate { get; set; }
        public bool ManuallyScheduled { get; set; }
        public bool Draggable { get; set; }
        public bool Resizable { get; set; }
        public bool Rollup { get; set; }
        public bool ShowInTimeline { get; set; }
        public string Color { get; set; }
    
        public virtual ICollection<Assignment> Assignments { get; set; }
        public virtual ICollection<Dependency> Predecessors { get; set; }
        public virtual ICollection<Dependency> Successors { get; set; }
        public virtual ICollection<Task> ChildrenRaw { get; set; }
        public virtual Task Parent { get; set; }
        public virtual Calendar Calendar { get; set; }
        public virtual ICollection<TaskSegment> Segments { get; set; }
    }
}
