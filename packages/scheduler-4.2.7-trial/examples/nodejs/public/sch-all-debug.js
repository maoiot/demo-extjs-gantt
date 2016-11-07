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

//@define Robo.widget.RedoButton
//@require Robo.widget.UndoButton

//@define Robo.widget.StatusPanel
//@require Ext.tree.Panel

//@define Robo.widget.UndoButton
//@require Ext.button.Split

//@define Sch.app.CrudManagerDomain
//@require Ext.app.EventDomain
//@require Sch.crud.AbstractManager

//@define Sch.column.Day
//@require Ext.grid.column.Column

//@define Sch.column.Resource
//@require Ext.grid.Column

//@define Sch.column.Summary
//@require Ext.grid.column.Column

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

//@define Sch.data.undoredo.Manager
//@require Robo.Manager

//@define Sch.data.undoredo.Transaction
//@require Robo.Transaction

//@define Sch.data.undoredo.mixin.StoreHint
//@require Robo.data.Store

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

//@define Sch.eventlayout.Table
//@require Sch.eventlayout.Horizontal

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

//@define Sch.feature.Grouping
//@require Ext.grid.feature.Grouping

//@define Sch.feature.ResizeZone
//@require Ext.util.Observable
//@require Ext.resizer.Resizer
//@require Sch.tooltip.Tooltip
//@require Sch.util.ScrollManager

//@define Sch.feature.SchedulerDragZone
//@require Ext.dd.DragZone
//@require Sch.tooltip.Tooltip
//@require Ext.dd.StatusProxy

//@define Sch.field.CellEditor
//@require Ext.form.field.Text

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

//@define Sch.patches.Element
//@require Sch.util.Patch

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

//@define Sch.plugin.CellPlugin
//@require Ext.AbstractPlugin
//@require Ext.form.field.Base
//@require Sch.field.CellEditor
//@require Sch.util.Date

//@define Sch.plugin.CurrentTimeLine
//@require Sch.plugin.Lines
//@require Ext.data.JsonStore

//@define Sch.plugin.DragSelector
//@require Sch.util.DragTracker
//@require Sch.util.ScrollManager

//@define Sch.plugin.EventEditor
//@require Ext.form.Panel
//@require Sch.util.Date
//@require Ext.util.Region
//@require Ext.form.Label
//@require Ext.form.field.Date
//@require Ext.form.field.Time

//@define Sch.plugin.EventTools
//@require Ext.Container

//@define Sch.plugin.Export
//@require Ext.util.Observable
//@require Ext.XTemplate
//@require Sch.plugin.exporter.SinglePage
//@require Sch.plugin.exporter.MultiPage
//@require Sch.plugin.exporter.MultiPageVertical
//@require Sch.widget.ExportDialog

//@define Sch.plugin.HeaderZoom
//@require Sch.util.DragTracker

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

//@define Sch.plugin.SimpleEditor
//@require Ext.Editor
//@require Ext.form.TextField

//@define Sch.plugin.TimeGap
//@require Sch.plugin.Zones
//@require Ext.data.JsonStore
//@require Sch.model.Range

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

//@define Sch.preset.ViewPresetHeaderRow

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

//@define Sch.util.Debug

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

//@define Sch.widget.PagingToolbar
//@require Ext.toolbar.Paging

//@define Sch.widget.ResizePicker
//@require Ext.Panel

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

//@define Robo.widget.RedoButton
//@require Robo.widget.UndoButton

//@define Robo.widget.StatusPanel
//@require Ext.tree.Panel

//@define Robo.widget.UndoButton
//@require Ext.button.Split

/*

Ext Scheduler 4.2.7
Copyright(c) 2009-2016 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/license

*/
