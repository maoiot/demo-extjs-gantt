//@define Sch.app.CrudManagerDomain
//@require Ext.app.EventDomain
//@require Sch.crud.AbstractManager

//@define Sch.column.Day
//@require Ext.grid.column.Column

//@define Sch.column.Resource
//@require Ext.grid.Column

//@define Sch.column.timeAxis.Horizontal
//@require Ext.grid.column.Column
//@require Sch.view.HorizontalTimeAxis

//@define Sch.column.timeAxis.Vertical
//@require Ext.grid.column.Column

//@define Sch.crud.AbstractManager
//@require Ext.data.StoreManager

//@define Sch.crud.encoder.Json

//@define Sch.crud.encoder.Xml
//@require Ext.XTemplate

//@define Sch.crud.transport.Ajax

//@define Sch.data.AssignmentStore
//@require Ext.data.Store
//@require Sch.patches.CollectionKey
//@uses Sch.data.util.EventAssignmentsCache
//@uses Sch.data.util.ResourceAssignmentsCache
//@uses Sch.data.util.AssignmentStoreEventResourcesCache
//@uses Sch.data.util.AssignmentStoreResourceEventsCache

//@define Sch.data.Calendar
//@require Ext.data.Store
//@require Ext.Date
//@require Sch.model.CalendarDay
//@require Sch.model.Range
//@require Sch.util.Date

//@define Sch.data.CrudManager
//@require Sch.crud.AbstractManager

//@define Sch.data.DependencyStore
//@require Ext.data.Store
//@require Sch.patches.CollectionKey
//@uses Ext.data.Model
//@uses Sch.data.util.EventDependencyCache

//@define Sch.data.EventStore
//@require Ext.data.Store

//@define Sch.data.ResourceStore
//@require Ext.data.Store

//@define Sch.data.ResourceTreeStore
//@require Ext.data.TreeStore
//@require Sch.patches.TreeStore
//@require Sch.patches.TreeStoreInternalIdMap

//@define Sch.data.TimeAxis
//@require Ext.data.JsonStore
//@require Sch.util.Date
//@require Sch.model.TimeAxisTick

//@define Sch.data.mixin.CacheHintHelper
//@require Ext.Mixin

//@define Sch.data.mixin.EventStore
//@require Ext.Mixin
//@require Sch.util.Date
//@require Sch.data.util.IdConsistencyManager
//@require Sch.data.util.ModelPersistencyManager
//@require Sch.data.util.ResourceEventsCache

//@define Sch.data.mixin.FilterableTreeStore

//@define Sch.data.mixin.ResourceStore

//@define Sch.data.mixin.UniversalModelGetter

//@define Sch.data.util.AssignmentStoreEventResourcesCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.data.util.AssignmentStoreResourceEventsCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.data.util.EventAssignmentsCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.data.util.EventDependencyCache
//@require Sch.util.Cache

//@define Sch.data.util.IdConsistencyManager

//@define Sch.data.util.ModelPersistencyManager

//@define Sch.data.util.ResourceAssignmentsCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.data.util.ResourceEventsCache
//@require Sch.util.Cache
//@require Ext.data.Model

//@define Sch.eventlayout.Horizontal

//@define Sch.eventlayout.Vertical
//@require Sch.util.Date

//@define Sch.feature.AbstractTimeSpan
//@require Ext.AbstractPlugin

//@define Sch.feature.ColumnLines
//@require Sch.plugin.Lines
//@require Ext.data.JsonStore

//@define Sch.feature.DragCreator
//@require Ext.XTemplate
//@require Ext.ToolTip
//@require Sch.util.Date
//@require Sch.util.ScrollManager
//@require Sch.util.DragTracker
//@require Sch.tooltip.Tooltip
//@require Sch.tooltip.HoverTip

//@define Sch.feature.DragDrop
//@require Ext.XTemplate
//@require Sch.feature.SchedulerDragZone

//@define Sch.feature.ResizeZone
//@require Ext.util.Observable
//@require Ext.resizer.Resizer
//@require Sch.tooltip.Tooltip
//@require Sch.util.ScrollManager

//@define Sch.feature.SchedulerDragZone
//@require Ext.dd.DragZone
//@require Sch.tooltip.Tooltip
//@require Ext.dd.StatusProxy

//@define Sch.layout.TableLayout
//@require Ext.view.TableLayout

//@define Sch.locale.En
//@require Sch.locale.Locale

//@define Sch.locale.Locale

//@define Sch.mixin.AbstractSchedulerPanel
//@require Sch.model.Event
//@require Sch.model.Resource
//@require Sch.data.EventStore
//@require Sch.data.ResourceStore
//@require Sch.util.Date
//@require Sch.plugin.ResourceZones

//@define Sch.mixin.AbstractSchedulerView
//@require Sch.model.Assignment
//@require Sch.template.Event
//@require Sch.eventlayout.Horizontal
//@require Sch.view.Vertical
//@require Sch.eventlayout.Vertical

//@define Sch.mixin.AbstractTimelinePanel
//@require Sch.data.TimeAxis
//@require Sch.view.model.TimeAxis
//@require Sch.feature.ColumnLines
//@require Sch.preset.Manager

//@define Sch.mixin.AbstractTimelineView
//@require Sch.data.TimeAxis
//@require Sch.view.Horizontal
//@uses Ext.dom.Query

//@define Sch.mixin.FilterableTreeView

//@define Sch.mixin.GridViewCanvas
//@require Ext.Mixin

//@define Sch.mixin.Localizable
//@require Sch.locale.En

//@define Sch.mixin.PartnerTimelinePanel
//@require Ext.Mixin

//@define Sch.mixin.SchedulerPanel
//@require Sch.mixin.AbstractSchedulerPanel
//@require Sch.view.SchedulerGridView
//@require Sch.selection.EventModel
//@require Sch.selection.AssignmentModel
//@require Sch.column.timeAxis.Vertical

//@define Sch.mixin.SchedulerView
//@require Sch.mixin.AbstractSchedulerView
//@require Sch.patches.DragDropManager
//@require Sch.patches.NavigationModel
//@require Sch.patches.NavigationModel6_0_2
//@require Sch.feature.DragCreator
//@require Sch.feature.DragDrop
//@require Sch.feature.ResizeZone
//@require Sch.column.Resource
//@require Sch.column.Day
//@require Sch.view.Calendar
//@require Ext.XTemplate

//@define Sch.mixin.TimelinePanel
//@require Sch.mixin.AbstractTimelinePanel
//@require Sch.column.timeAxis.Horizontal
//@require Sch.preset.Manager
//@require Sch.data.Calendar
//@require Sch.layout.TableLayout
//@uses Sch.patches.TableView
//@uses Sch.patches.TableView_6_0_2
//@uses Sch.patches.TableView2
//@uses Sch.patches.TablePanel
//@uses Sch.patches.BufferedRenderer
//@uses Sch.patches.CellContext
//@uses Sch.patches.RowSynchronizer
//@uses Sch.patches.Explorer
//@uses Sch.patches.DomScroller
//@uses Sch.patches.TimelineGridView
//@uses Sch.patches.TimelinePanel

//@define Sch.mixin.TimelineView
//@require Sch.mixin.AbstractTimelineView
//@require Ext.tip.ToolTip
//@require Sch.patches.NavigationModel6_0_2
//@require Sch.patches.TouchScroll
//@require Sch.patches.View
//@require Sch.patches.Scroller
//@require Sch.patches.Queue
//@require Sch.patches.LayoutContext
//@require Sch.patches.TableLayout
//@require Sch.patches.ColumnLayout
//@require Sch.patches.ToolTip

//@define Sch.mixin.Zoomable

//@define Sch.model.Assignment
//@require Sch.model.Customizable

//@define Sch.model.CalendarDay
//@require Ext.data.Types
//@require Sch.model.Customizable

//@define Sch.model.Customizable
//@require Ext.data.Model

//@define Sch.model.Dependency
//@require Sch.model.Customizable
//@require Sch.model.Range

//@define Sch.model.Event
//@require Sch.model.Range

//@define Sch.model.Range
//@require Sch.model.Customizable
//@require Sch.util.Date

//@define Sch.model.Resource
//@require Sch.model.Customizable

//@define Sch.model.TimeAxisTick
//@require Sch.model.Range

//@define Sch.panel.SchedulerGrid
//@require Sch.panel.TimelineGridPanel

//@define Sch.panel.SchedulerTree
//@require Sch.panel.TimelineTreePanel

//@define Sch.panel.TimelineGridPanel
//@require Ext.grid.Panel

//@define Sch.panel.TimelineTreePanel
//@require Ext.tree.Panel
//@require Ext.grid.Panel
//@require Ext.data.TreeStore
//@require Sch.mixin.FilterableTreeView
//@require Sch.patches.TreeNavigationModel

//@define Sch.patches.BufferedRenderer
//@require Sch.util.Patch

//@define Sch.patches.CellContext
//@require Sch.util.Patch

//@define Sch.patches.CellEditing
//@require Sch.util.Patch

//@define Sch.patches.CellEditor
//@require Sch.util.Patch

//@define Sch.patches.CollectionKey
//@require Sch.util.Patch

//@define Sch.patches.ColumnLayout
//@require Sch.util.Patch

//@define Sch.patches.DomScroller
//@require Sch.util.Patch

//@define Sch.patches.DragDropManager
//@require Sch.util.Patch
//@require Ext.dd.ScrollManager

//@define Sch.patches.Explorer
//@require Sch.util.Patch

//@define Sch.patches.LayoutContext
//@require Sch.util.Patch

//@define Sch.patches.NavigationModel
//@require Sch.util.Patch

//@define Sch.patches.NavigationModel6_0_2
//@require Sch.util.Patch

//@define Sch.patches.Queue
//@require Sch.util.Patch

//@define Sch.patches.RowSynchronizer
//@require Sch.util.Patch

//@define Sch.patches.Scroller
//@require Sch.util.Patch

//@define Sch.patches.TableLayout
//@require Sch.util.Patch

//@define Sch.patches.TablePanel
//@require Sch.util.Patch

//@define Sch.patches.TableView
//@require Sch.util.Patch

//@define Sch.patches.TableView2
//@require Sch.util.Patch

//@define Sch.patches.TableView_6_0_2
//@require Sch.util.Patch

//@define Sch.patches.TimelineGridView
//@require Sch.util.Patch

//@define Sch.patches.TimelinePanel
//@require Sch.util.Patch

//@define Sch.patches.ToolTip
//@require Sch.util.Patch

//@define Sch.patches.TouchScroll
//@require Sch.util.Patch

//@define Sch.patches.TreeNavigationModel
//@require Sch.util.Patch

//@define Sch.patches.TreeStore
//@require Sch.util.Patch

//@define Sch.patches.TreeStoreInternalIdMap
//@require Sch.util.Patch

//@define Sch.patches.View
//@require Sch.util.Patch

//@define Sch.plugin.CurrentTimeLine
//@require Sch.plugin.Lines
//@require Ext.data.JsonStore

//@define Sch.plugin.Export
//@require Ext.util.Observable
//@require Ext.XTemplate
//@require Sch.plugin.exporter.SinglePage
//@require Sch.plugin.exporter.MultiPage
//@require Sch.plugin.exporter.MultiPageVertical
//@require Sch.widget.ExportDialog

//@define Sch.plugin.Lines
//@require Sch.feature.AbstractTimeSpan

//@define Sch.plugin.NonWorkingTime
//@require Sch.plugin.Zones
//@require Ext.data.Store
//@require Sch.model.Range

//@define Sch.plugin.Pan
//@require Ext.AbstractPlugin

//@define Sch.plugin.Printable
//@require Sch.plugin.Export
//@require Ext.XTemplate

//@define Sch.plugin.ResourceZones
//@require Sch.plugin.Zones

//@define Sch.plugin.TreeCellEditing
//@require Ext.grid.plugin.CellEditing
//@require Sch.patches.CellEditing
//@require Sch.patches.CellEditor

//@define Sch.plugin.Zones
//@require Sch.feature.AbstractTimeSpan
//@require Sch.model.Range

//@define Sch.plugin.exporter.AbstractExporter
//@require Ext.util.Observable
//@require Ext.XTemplate

//@define Sch.plugin.exporter.MultiPage
//@require Sch.plugin.exporter.AbstractExporter

//@define Sch.plugin.exporter.MultiPageVertical
//@require Sch.plugin.exporter.AbstractExporter

//@define Sch.plugin.exporter.SinglePage
//@require Sch.plugin.exporter.AbstractExporter

//@define Sch.preset.Manager
//@require Ext.util.MixedCollection
//@require Sch.util.Date
//@require Sch.preset.ViewPreset

//@define Sch.preset.ViewPreset
//@require Sch.util.Date

//@define Sch.selection.AssignmentModel
//@require Sch.selection.EventModel

//@define Sch.selection.EventModel
//@require Ext.selection.Model
//@require Ext.util.KeyNav

//@define Sch.template.Dependency
//@require Ext.XTemplate

//@define Sch.template.Event
//@require Ext.XTemplate

//@define Sch.tooltip.ClockTemplate
//@require Ext.XTemplate

//@define Sch.tooltip.HoverTip
//@require Ext.tip.ToolTip
//@require Sch.tooltip.ClockTemplate

//@define Sch.tooltip.Tooltip
//@require Ext.tip.ToolTip
//@require Sch.tooltip.ClockTemplate

//@define Sch.util.Cache

//@define Sch.util.Date
//@require Ext.Date

//@define Sch.util.DragTracker
//@require Ext.dd.DragTracker
//@require Ext.util.Region

//@define Sch.util.Patch

//@define Sch.util.RectangularPathFinder
//@uses Ext.Array

//@define Sch.util.ScrollManager

//@define Sch.view.Calendar
//@require Ext.util.Region

//@define Sch.view.Horizontal
//@require Ext.util.Region
//@require Ext.Element
//@require Ext.Array
//@require Sch.util.Date

//@define Sch.view.HorizontalTimeAxis
//@require Ext.util.Observable
//@require Ext.XTemplate

//@define Sch.view.SchedulerGridView
//@require Sch.view.TimelineGridView

//@define Sch.view.TimelineGridView
//@require Ext.grid.View

//@define Sch.view.Vertical

//@define Sch.view.dependency.Mixin
//@require Ext.Mixin
//@uses Sch.view.dependency.View

//@define Sch.view.dependency.Painter
//@uses Ext.Array
//@uses Ext.XTemplate
//@uses Ext.dom.Query
//@uses Sch.util.Date
//@uses Sch.util.RectangularPathFinder
//@uses Sch.template.Dependency

//@define Sch.view.dependency.View
//@uses Ext.data.StoreManager
//@uses Ext.Array
//@uses Ext.dom.CompositeElementLite
//@uses Sch.view.dependency.Painter

//@define Sch.view.model.TimeAxis
//@require Ext.util.Observable
//@require Ext.Date
//@require Sch.util.Date
//@require Sch.preset.Manager

//@define Sch.widget.ColumnPicker
//@require Ext.form.field.ComboBox
//@require Ext.data.Store

//@define Sch.widget.ExportDialog
//@require Ext.window.Window
//@require Ext.ProgressBar
//@require Sch.widget.ExportDialogForm

//@define Sch.widget.ExportDialogForm
//@require Ext.form.Panel
//@require Ext.data.Store
//@require Ext.XTemplate
//@require Ext.form.field.Number
//@require Ext.form.field.ComboBox
//@require Ext.form.field.Date
//@require Ext.form.FieldContainer
//@require Ext.form.field.Checkbox
//@require Sch.widget.ResizePicker
//@require Sch.widget.ColumnPicker

//@define Sch.widget.ResizePicker
//@require Ext.Panel

//@define Gnt.Tooltip
//@require Ext.tip.ToolTip
//@require Ext.Template

//@define Gnt.column.AddNew
//@require Ext.grid.column.Column
//@require Ext.form.field.ComboBox
//@require Ext.Editor

//@define Gnt.column.AssignmentUnits
//@require Ext.grid.column.Number
//@require Gnt.field.Percent

//@define Gnt.column.BaselineEndDate
//@require Gnt.column.EndDate
//@require Gnt.field.BaselineEndDate

//@define Gnt.column.BaselineStartDate
//@require Gnt.column.StartDate
//@require Gnt.field.BaselineStartDate

//@define Gnt.column.Calendar
//@require Ext.grid.column.Column
//@require Gnt.model.Calendar
//@require Gnt.field.Calendar

//@define Gnt.column.ConstraintDate
//@require Ext.grid.column.Date
//@require Gnt.field.ConstraintDate

//@define Gnt.column.ConstraintType
//@require Ext.grid.column.Column
//@require Gnt.field.ConstraintType

//@define Gnt.column.DeadlineDate
//@require Ext.grid.column.Date
//@require Gnt.field.DeadlineDate

//@define Gnt.column.Dependency
//@require Ext.grid.column.Column
//@require Gnt.field.Dependency

//@define Gnt.column.DragDrop
//@require Ext.grid.column.Column

//@define Gnt.column.Duration
//@require Ext.grid.column.Column
//@require Gnt.field.Duration

//@define Gnt.column.EarlyEndDate
//@require Ext.grid.column.Date

//@define Gnt.column.EarlyStartDate
//@require Ext.grid.column.Date

//@define Gnt.column.Effort
//@require Gnt.column.Duration
//@require Gnt.field.Effort

//@define Gnt.column.EndDate
//@require Ext.grid.column.Date
//@require Ext.grid.CellEditor
//@require Gnt.field.EndDate

//@define Gnt.column.LateEndDate
//@require Ext.grid.column.Date

//@define Gnt.column.LateStartDate
//@require Ext.grid.column.Date

//@define Gnt.column.ManuallyScheduled
//@require Ext.grid.Column
//@require Gnt.field.ManuallyScheduled

//@define Gnt.column.Milestone
//@require Ext.grid.column.Column
//@require Gnt.field.Milestone

//@define Gnt.column.Name
//@require Ext.tree.Column

//@define Gnt.column.Note
//@require Ext.grid.column.Column
//@require Gnt.field.Note

//@define Gnt.column.PercentDone
//@require Ext.grid.column.Number
//@require Gnt.field.Percent

//@define Gnt.column.Predecessor
//@require Gnt.column.Dependency

//@define Gnt.column.ReadOnly
//@require Ext.grid.Column

//@define Gnt.column.ResourceAssignment
//@require Ext.grid.column.Column
//@require Gnt.field.Assignment

//@define Gnt.column.ResourceName
//@require Ext.grid.column.Column

//@define Gnt.column.Rollup
//@require Ext.grid.Column

//@define Gnt.column.Scale
//@require Ext.grid.column.Template

//@define Gnt.column.SchedulingMode
//@require Ext.grid.column.Column
//@require Gnt.field.SchedulingMode

//@define Gnt.column.Sequence
//@require Ext.grid.column.Column

//@define Gnt.column.ShowInTimeline
//@require Ext.grid.column.Check
//@uses Gnt.patches.CheckColumn

//@define Gnt.column.Slack
//@require Ext.grid.column.Column
//@require Ext.Number
//@require Sch.util.Date

//@define Gnt.column.StartDate
//@require Ext.grid.column.Date
//@require Gnt.field.StartDate

//@define Gnt.column.Successor
//@require Gnt.column.Dependency

//@define Gnt.column.WBS
//@require Ext.grid.column.Column

//@define Gnt.column.mixin.TaskFieldColumn
//@require Ext.Mixin

//@define Gnt.constraint.AsLateAsPossible
//@require Gnt.constraint.Base

//@define Gnt.constraint.AsSoonAsPossible
//@require Gnt.constraint.Base

//@define Gnt.constraint.Base

//@define Gnt.constraint.FinishNoEarlierThan
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.constraint.FinishNoLaterThan
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.constraint.MustFinishOn
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.constraint.MustStartOn
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.constraint.StartNoEarlierThan
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.constraint.StartNoLaterThan
//@require Gnt.constraint.Base
//@require Sch.util.Date

//@define Gnt.data.AssignmentStore
//@require Sch.data.AssignmentStore
//@require Gnt.model.Assignment

//@define Gnt.data.Calendar
//@require Sch.data.Calendar

//@define Gnt.data.CalendarManager
//@require Ext.data.TreeStore
//@require Gnt.data.Calendar

//@define Gnt.data.CrudManager
//@require Sch.crud.AbstractManager

//@define Gnt.data.DependencyStore
//@require Sch.data.DependencyStore
//@uses Gnt.data.util.TaskDependencyCache

//@define Gnt.data.Linearizator
//@require Gnt.data.linearizator.CycleResolvers

//@define Gnt.data.ResourceStore
//@require Gnt.model.Resource
//@require Sch.data.ResourceStore

//@define Gnt.data.ResourceUtilizationEventStore
//@require Sch.data.EventStore

//@define Gnt.data.ResourceUtilizationStore
//@require Sch.data.ResourceTreeStore
//@uses Gnt.data.ResourceUtilizationEventStore
//@uses Gnt.model.Resource
//@uses Gnt.model.Assignment
//@uses Gnt.model.UtilizationEvent
//@uses Gnt.model.utilization.ResourceStoreUtilizationNegotiationStrategy

//@define Gnt.data.TaskStore
//@require Ext.data.TreeStore
//@require Sch.util.Date
//@require Sch.patches.TreeStore
//@require Sch.patches.TreeStoreInternalIdMap
//@require Gnt.data.Linearizator
//@require Gnt.model.Task
//@require Gnt.model.Project
//@require Gnt.data.Calendar
//@require Gnt.data.DependencyStore
//@require Gnt.data.ResourceStore
//@require Gnt.data.AssignmentStore

//@define Gnt.data.calendar.BusinessTime
//@require Gnt.data.Calendar

//@define Gnt.data.linearizator.CycleResolvers

//@define Gnt.data.mixin.ProjectableStore

//@define Gnt.data.undoredo.Manager
//@require Robo.Manager
//@uses Gnt.data.TaskStore
//@uses Gnt.data.undoredo.action.taskstore.Update

//@define Gnt.data.undoredo.action.taskstore.Update
//@require Robo.action.tree.Update
//@uses Ext.Array

//@define Gnt.data.undoredo.mixin.TaskStoreHint
//@require Robo.data.Store

//@define Gnt.data.util.TaskDependencyCache
//@require Sch.data.util.EventDependencyCache

//@define Gnt.feature.DependencyDragDrop
//@require Ext.util.Observable
//@require Gnt.feature.DependencyDragZone
//@require Gnt.feature.DependencyDropZone
//@require Ext.XTemplate

//@define Gnt.feature.DependencyDragZone
//@require Ext.dd.DragZone

//@define Gnt.feature.DependencyDropZone
//@require Ext.dd.DropZone

//@define Gnt.feature.DragCreator
//@require Ext.Template
//@require Sch.util.DragTracker
//@require Gnt.Tooltip

//@define Gnt.feature.LabelEditor
//@require Ext.Editor

//@define Gnt.feature.ProgressBarResize
//@require Ext.ToolTip
//@require Ext.resizer.Resizer

//@define Gnt.feature.TaskDragDrop
//@require Ext.dd.DragZone
//@require Gnt.Tooltip
//@require Ext.dd.StatusProxy

//@define Gnt.feature.TaskResize
//@require Ext.resizer.Resizer
//@require Gnt.Tooltip

//@define Gnt.field.Assignment
//@require Ext.form.field.Picker
//@require Gnt.widget.AssignmentGrid
//@require Gnt.patches.CheckboxModel
//@require Gnt.patches.NavigationModel

//@define Gnt.field.BaselineEndDate
//@require Gnt.field.EndDate

//@define Gnt.field.BaselineStartDate
//@require Gnt.field.StartDate

//@define Gnt.field.Calendar
//@require Ext.form.field.ComboBox
//@require Ext.data.Store
//@require Gnt.model.Calendar
//@require Gnt.data.Calendar

//@define Gnt.field.ConstraintDate
//@require Gnt.field.Date

//@define Gnt.field.ConstraintType
//@require Ext.form.field.ComboBox
//@uses Gnt.constraint.Base

//@define Gnt.field.Date
//@require Ext.form.field.Date

//@define Gnt.field.DeadlineDate
//@require Gnt.field.Date
//@require Sch.util.Date

//@define Gnt.field.Dependency
//@require Ext.form.field.Text
//@require Gnt.util.DependencyParser

//@define Gnt.field.Duration
//@require Ext.form.field.Number
//@require Gnt.util.DurationParser
//@require Gnt.field.trigger.DurationSpinner

//@define Gnt.field.Effort
//@require Gnt.field.Duration
//@require Gnt.util.DurationParser

//@define Gnt.field.EndDate
//@require Gnt.field.Date
//@require Sch.util.Date

//@define Gnt.field.ManuallyScheduled
//@require Ext.form.field.Checkbox

//@define Gnt.field.Milestone
//@require Ext.form.field.ComboBox
//@require Ext.data.JsonStore

//@define Gnt.field.Note
//@require Ext.form.field.Picker
//@require Ext.form.field.HtmlEditor

//@define Gnt.field.Percent
//@require Ext.form.field.Number

//@define Gnt.field.ReadOnly
//@require Ext.form.field.Checkbox

//@define Gnt.field.SchedulingMode
//@require Ext.form.field.ComboBox

//@define Gnt.field.ShowInTimeline
//@require Ext.form.field.Checkbox

//@define Gnt.field.StartDate
//@require Gnt.field.Date

//@define Gnt.field.mixin.TaskField
//@require Ext.Mixin

//@define Gnt.field.trigger.DurationSpinner
//@require Ext.form.trigger.Spinner

//@define Gnt.locale.En
//@require Sch.locale.Locale
//@require Sch.locale.En

//@define Gnt.mixin.Localizable
//@require Sch.mixin.Localizable
//@require Gnt.locale.En

//@define Gnt.model.Assignment
//@require Sch.model.Assignment
//@uses Sch.util.Date

//@define Gnt.model.Calendar
//@require Sch.model.Customizable
//@require Ext.data.NodeInterface

//@define Gnt.model.CalendarDay
//@require Sch.model.CalendarDay

//@define Gnt.model.Dependency
//@require Sch.model.Dependency

//@define Gnt.model.Project
//@require Gnt.model.Task

//@define Gnt.model.Resource
//@require Sch.model.Resource

//@define Gnt.model.Task
//@require Sch.model.Range
//@require Sch.util.Date
//@require Ext.data.NodeInterface
//@uses Gnt.model.TaskSegment

//@define Gnt.model.TaskSegment
//@require Gnt.model.Task

//@define Gnt.model.UtilizationEvent
//@require Sch.model.Event
//@uses Ext.Date
//@uses Ext.Object
//@uses Gnt.model.Resource
//@uses Gnt.model.Assignment

//@define Gnt.model.UtilizationResource
//@require Sch.model.Resource
//@require Ext.data.NodeInterface
//@uses Gnt.model.Resource
//@uses Gnt.model.Assignment

//@define Gnt.model.Week
//@require Ext.data.Model

//@define Gnt.model.mixin.ProjectableModel

//@define Gnt.model.task.Constraints
//@require Gnt.constraint.Base
//@require Gnt.constraint.StartNoEarlierThan
//@require Gnt.constraint.StartNoLaterThan
//@require Gnt.constraint.FinishNoEarlierThan
//@require Gnt.constraint.FinishNoLaterThan
//@require Gnt.constraint.MustStartOn
//@require Gnt.constraint.MustFinishOn

//@define Gnt.model.task.More

//@define Gnt.model.task.Splittable
//@uses Gnt.model.TaskSegment

//@define Gnt.model.utilization.DefaultUtilizationNegotiationStrategy
//@uses Ext.Date
//@uses Ext.Object

//@define Gnt.model.utilization.ResourceStoreUtilizationNegotiationStrategy
//@require Gnt.model.utilization.DefaultUtilizationNegotiationStrategy
//@uses Ext.Date
//@uses Gnt.model.UtilizationEvent

//@define Gnt.model.utilization.UtilizationNegotiationStrategyMixin
//@uses Gnt.model.utilization.DefaultUtilizationNegotiationStrategy

//@define Gnt.panel.Gantt
//@require Sch.panel.TimelineTreePanel
//@require Ext.layout.container.Border
//@require Ext.tree.plugin.TreeViewDragDrop
//@require Ext.util.CSS
//@require Sch.plugin.NonWorkingTime
//@require Gnt.patches.CellEditor
//@require Gnt.patches.CellEditing
//@require Gnt.patches.TreeViewDragDrop
//@require Gnt.patches.SpreadsheetModel
//@require Gnt.patches.LockingView
//@require Gnt.data.ResourceStore
//@require Gnt.data.AssignmentStore
//@require Gnt.data.Calendar
//@require Gnt.data.TaskStore
//@require Gnt.data.DependencyStore
//@require Gnt.view.Gantt
//@require Gnt.patches.RightClick
//@require Gnt.plugin.ConstraintResolutionGui
//@require Gnt.plugin.ProjectLines
//@require Gnt.plugin.Replicator
//@require Gnt.template.TaskTooltip
//@uses Sch.plugin.CurrentTimeLine

//@define Gnt.panel.ResourceHistogram
//@require Sch.panel.TimelineGridPanel
//@require Sch.patches.TablePanel
//@require Ext.XTemplate
//@require Sch.util.Date
//@require Sch.plugin.NonWorkingTime
//@require Gnt.column.Scale
//@require Gnt.view.ResourceHistogram

//@define Gnt.panel.ResourceUtilization
//@require Sch.panel.SchedulerTree
//@require Gnt.data.ResourceUtilizationStore
//@uses Ext.util.Format

//@define Gnt.panel.Timeline
//@require Ext.Panel
//@require Ext.form.field.Display
//@require Gnt.panel.TimelineScheduler

//@define Gnt.panel.TimelineScheduler
//@require Sch.panel.SchedulerGrid
//@require Ext.data.StoreManager
//@require Sch.data.ResourceStore
//@require Sch.data.EventStore

//@define Gnt.patches.AbstractClipboard
//@require Sch.util.Patch

//@define Gnt.patches.CellEditing
//@require Sch.util.Patch

//@define Gnt.patches.CellEditor
//@require Sch.util.Patch

//@define Gnt.patches.CheckColumn
//@require Sch.util.Patch

//@define Gnt.patches.CheckboxModel
//@require Sch.util.Patch

//@define Gnt.patches.ComponentManager
//@require Sch.util.Patch

//@define Gnt.patches.DelimitedValue
//@require Sch.util.Patch

//@define Gnt.patches.LabelEditor
//@require Sch.util.Patch

//@define Gnt.patches.LockingView
//@require Sch.util.Patch

//@define Gnt.patches.NavigationModel
//@require Sch.util.Patch

//@define Gnt.patches.RightClick
//@require Sch.util.Patch

//@define Gnt.patches.SelectionExtender
//@require Sch.util.Patch

//@define Gnt.patches.SpreadsheetModel
//@require Sch.util.Patch

//@define Gnt.patches.TaskStore
//@require Ext.Mixin

//@define Gnt.patches.Tooltip
//@require Sch.util.Patch

//@define Gnt.patches.TreeViewDragDrop
//@require Sch.util.Patch

//@define Gnt.plugin.Clipboard
//@require Ext.grid.plugin.Clipboard
//@require Gnt.patches.DelimitedValue
//@require Gnt.patches.AbstractClipboard

//@define Gnt.plugin.ConstraintResolutionGui
//@require Ext.AbstractPlugin
//@require Gnt.widget.ConstraintResolutionWindow

//@define Gnt.plugin.DependencyEditor
//@require Ext.form.Panel
//@require Ext.util.Filter
//@require Ext.form.field.Display
//@require Ext.form.field.ComboBox
//@require Ext.form.field.Number
//@require Gnt.model.Dependency
//@require Ext.data.ArrayStore

//@define Gnt.plugin.Export
//@require Sch.plugin.Export
//@require Gnt.plugin.exporter.SinglePage
//@require Gnt.plugin.exporter.MultiPage
//@require Gnt.plugin.exporter.MultiPageVertical

//@define Gnt.plugin.Printable
//@require Sch.plugin.Printable
//@require Gnt.plugin.exporter.MultiPage
//@require Gnt.plugin.exporter.MultiPageVertical

//@define Gnt.plugin.ProjectLines
//@require Sch.plugin.Lines
//@require Ext.data.Store

//@define Gnt.plugin.Replicator
//@require Ext.grid.selection.Replicator

//@define Gnt.plugin.TaskContextMenu
//@require Ext.menu.Menu
//@require Gnt.model.Task

//@define Gnt.plugin.exporter.MultiPage
//@require Sch.plugin.exporter.MultiPage

//@define Gnt.plugin.exporter.MultiPageVertical
//@require Sch.plugin.exporter.MultiPageVertical

//@define Gnt.plugin.exporter.SinglePage
//@require Sch.plugin.exporter.SinglePage

//@define Gnt.plugin.exporter.mixin.DependencyPainter

//@define Gnt.plugin.taskeditor.BaseEditor
//@require Ext.window.Window
//@require Ext.window.MessageBox

//@define Gnt.plugin.taskeditor.ProjectEditor
//@require Gnt.plugin.taskeditor.BaseEditor
//@require Gnt.widget.taskeditor.ProjectEditor

//@define Gnt.plugin.taskeditor.TaskEditor
//@require Gnt.plugin.taskeditor.BaseEditor
//@require Gnt.widget.taskeditor.TaskEditor

//@define Gnt.selection.SpreadsheetModel
//@require Ext.grid.selection.SpreadsheetModel
//@uses Gnt.column.WBS

//@define Gnt.template.CalendarDateInfo
//@require Ext.XTemplate

//@define Gnt.template.CalendarLegend
//@require Ext.Template

//@define Gnt.template.Deadline
//@require Ext.XTemplate

//@define Gnt.template.Milestone
//@require Gnt.template.Template

//@define Gnt.template.ParentTask
//@require Gnt.template.Template

//@define Gnt.template.RollupTask
//@require Ext.XTemplate

//@define Gnt.template.Task
//@require Gnt.template.Template

//@define Gnt.template.TaskTooltip
//@require Ext.XTemplate

//@define Gnt.template.Template
//@require Ext.XTemplate

//@define Gnt.util.Data

//@define Gnt.util.DependencyParser
//@require Gnt.util.DurationParser

//@define Gnt.util.DurationParser
//@require Sch.util.Date

//@define Gnt.view.Gantt
//@require Sch.view.TimelineGridView
//@require Ext.dd.ScrollManager
//@require Sch.patches.DragDropManager
//@require Sch.patches.NavigationModel
//@require Gnt.model.Task
//@require Gnt.template.Task
//@require Gnt.template.ParentTask
//@require Gnt.template.Milestone
//@require Gnt.template.RollupTask
//@require Gnt.template.Deadline
//@require Gnt.feature.TaskDragDrop
//@require Gnt.feature.ProgressBarResize
//@require Gnt.feature.TaskResize
//@require Sch.view.Horizontal
//@uses Gnt.feature.LabelEditor
//@uses Gnt.patches.LabelEditor
//@uses Gnt.feature.DragCreator

//@define Gnt.view.ResourceHistogram
//@require Sch.view.TimelineGridView
//@require Sch.patches.DragDropManager
//@require Sch.patches.NavigationModel
//@require Ext.XTemplate
//@require Ext.util.Format
//@require Sch.util.Date

//@define Gnt.view.dependency.Mixin
//@require Sch.view.dependency.Mixin
//@uses Gnt.view.dependency.View
//@uses Gnt.feature.DependencyDragDrop

//@define Gnt.view.dependency.Painter
//@require Sch.view.dependency.Painter

//@define Gnt.view.dependency.View
//@require Sch.view.dependency.View
//@require Gnt.view.dependency.Painter

//@define Gnt.widget.AssignmentEditGrid
//@require Ext.grid.Panel
//@require Ext.data.JsonStore
//@require Ext.window.MessageBox
//@require Ext.form.field.ComboBox
//@require Ext.grid.plugin.CellEditing
//@require Gnt.util.Data
//@require Gnt.data.AssignmentStore
//@require Gnt.data.ResourceStore
//@require Gnt.column.ResourceName
//@require Gnt.column.AssignmentUnits

//@define Gnt.widget.AssignmentGrid
//@require Ext.grid.Panel
//@require Ext.data.Store
//@require Ext.grid.plugin.CellEditing
//@require Gnt.column.ResourceName
//@require Gnt.column.AssignmentUnits

//@define Gnt.widget.Calendar
//@require Ext.picker.Date
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.ConstraintResolutionForm
//@require Ext.form.Panel
//@require Ext.form.RadioGroup
//@require Ext.form.field.Display

//@define Gnt.widget.ConstraintResolutionWindow
//@require Ext.window.Window
//@require Gnt.widget.ConstraintResolutionForm

//@define Gnt.widget.DependencyGrid
//@require Ext.grid.Panel
//@require Ext.data.JsonStore
//@require Ext.grid.plugin.CellEditing
//@require Ext.form.field.ComboBox
//@require Ext.util.Filter
//@require Gnt.model.Dependency
//@require Gnt.util.Data
//@require Gnt.field.Duration

//@define Gnt.widget.calendar.AvailabilityGrid
//@require Ext.grid.Panel
//@require Ext.Button
//@require Ext.data.Store
//@require Ext.grid.column.Date
//@require Ext.grid.plugin.CellEditing
//@require Ext.window.MessageBox

//@define Gnt.widget.calendar.Calendar
//@require Ext.form.Panel
//@require Ext.XTemplate
//@require Ext.data.Store
//@require Ext.grid.Panel
//@require Ext.grid.plugin.CellEditing
//@require Ext.layout.container.HBox
//@require Ext.layout.container.Column
//@require Ext.layout.container.Fit
//@require Ext.layout.container.Anchor
//@require Ext.form.FieldContainer
//@require Ext.form.field.Checkbox
//@require Ext.form.field.ComboBox
//@require Ext.form.field.Text
//@require Ext.tab.Panel
//@require Gnt.data.Calendar
//@require Gnt.model.Week
//@require Gnt.widget.calendar.DayEditor
//@require Gnt.widget.calendar.WeekEditor
//@require Gnt.widget.calendar.DatePicker
//@require Gnt.template.CalendarLegend
//@require Gnt.template.CalendarDateInfo

//@define Gnt.widget.calendar.CalendarManager
//@require Ext.Container
//@require Ext.tree.Panel
//@require Ext.menu.Menu
//@require Ext.tree.plugin.TreeViewDragDrop
//@require Gnt.patches.TreeViewDragDrop
//@require Gnt.widget.calendar.Calendar
//@require Gnt.data.calendar.BusinessTime

//@define Gnt.widget.calendar.CalendarManagerWindow
//@require Ext.window.Window
//@require Gnt.widget.calendar.CalendarManager

//@define Gnt.widget.calendar.CalendarWindow
//@require Ext.window.Window
//@require Gnt.widget.calendar.Calendar

//@define Gnt.widget.calendar.DatePicker
//@require Ext.picker.Date

//@define Gnt.widget.calendar.DayEditor
//@require Gnt.widget.calendar.AvailabilityGrid
//@require Ext.grid.plugin.CellEditing
//@require Gnt.data.Calendar
//@require Sch.util.Date

//@define Gnt.widget.calendar.ResourceCalendarGrid
//@require Ext.grid.Panel
//@require Ext.data.Store
//@require Ext.grid.plugin.CellEditing
//@require Sch.util.Date
//@require Gnt.model.Calendar
//@require Gnt.data.Calendar

//@define Gnt.widget.calendar.WeekEditor
//@require Ext.form.Panel
//@require Ext.grid.Panel
//@require Gnt.data.Calendar
//@require Sch.util.Date
//@require Gnt.widget.calendar.AvailabilityGrid

//@define Gnt.widget.taskeditor.AdvancedForm
//@require Gnt.widget.taskeditor.TaskForm
//@require Gnt.model.Task
//@require Ext.form.FieldSet
//@require Ext.form.FieldContainer
//@require Ext.form.field.Text
//@require Ext.form.field.Date
//@require Gnt.field.SchedulingMode
//@require Gnt.field.ManuallyScheduled
//@require Gnt.field.Calendar
//@require Gnt.field.ConstraintType
//@require Gnt.field.ConstraintDate
//@require Gnt.field.ReadOnly

//@define Gnt.widget.taskeditor.BaseEditor
//@require Ext.tab.Panel
//@require Gnt.util.Data

//@define Gnt.widget.taskeditor.BaseForm
//@require Ext.form.Panel

//@define Gnt.widget.taskeditor.ProjectEditor
//@require Gnt.widget.taskeditor.BaseEditor
//@require Gnt.widget.taskeditor.ProjectForm
//@require Ext.form.field.HtmlEditor

//@define Gnt.widget.taskeditor.ProjectForm
//@require Gnt.widget.taskeditor.BaseForm
//@require Gnt.model.Project
//@require Ext.form.FieldSet
//@require Ext.form.FieldContainer
//@require Ext.form.field.Text
//@require Gnt.field.Calendar
//@require Gnt.field.StartDate
//@require Gnt.field.EndDate
//@require Gnt.field.ReadOnly
//@require Ext.form.field.Checkbox

//@define Gnt.widget.taskeditor.TaskEditor
//@require Gnt.widget.taskeditor.BaseEditor
//@require Ext.form.field.HtmlEditor
//@require Ext.layout.container.Table
//@require Gnt.widget.taskeditor.TaskForm
//@require Gnt.widget.taskeditor.AdvancedForm
//@require Gnt.widget.AssignmentEditGrid
//@require Gnt.widget.DependencyGrid

//@define Gnt.widget.taskeditor.TaskForm
//@require Gnt.widget.taskeditor.BaseForm
//@require Gnt.model.Task
//@require Ext.form.FieldSet
//@require Ext.form.FieldContainer
//@require Ext.form.field.Text
//@require Ext.form.field.Date
//@require Ext.form.field.Checkbox
//@require Gnt.field.Percent
//@require Gnt.field.StartDate
//@require Gnt.field.EndDate
//@require Gnt.field.Duration
//@require Gnt.field.Effort
//@require Gnt.field.BaselineStartDate
//@require Gnt.field.BaselineEndDate

//@define Robo.Manager
//@require Ext.util.Observable
//@require Robo.util.Array
//@require Robo.Transaction
//@require Robo.data.Model
//@require Robo.action.flat.Update
//@require Robo.action.flat.Add
//@require Robo.action.flat.Remove
//@require Robo.action.tree.Append
//@require Robo.action.tree.Insert
//@require Robo.action.tree.Remove
//@require Robo.action.tree.Update
//@require Ext.data.Store
//@require Ext.data.StoreManager

//@define Robo.Transaction

//@define Robo.action.Base

//@define Robo.action.flat.Add
//@require Robo.action.Base

//@define Robo.action.flat.Remove
//@require Robo.action.Base

//@define Robo.action.flat.Update
//@require Robo.action.Base
//@require Ext.Array

//@define Robo.action.tree.Append
//@require Robo.action.Base

//@define Robo.action.tree.Insert
//@require Robo.action.Base

//@define Robo.action.tree.Remove
//@require Robo.action.Base

//@define Robo.action.tree.Update
//@require Robo.action.flat.Update

//@define Robo.data.Model
//@require Ext.Mixin

//@define Robo.data.Store
//@require Ext.Mixin
//@require Ext.util.Observable

//@define Robo.util.Array
