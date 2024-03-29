/*

Ext Gantt Pro 4.2.7
Copyright(c) 2009-2016 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/license

*/
/**
@class Sch.data.mixin.FilterableTreeStore

This is a mixin for the Ext.data.TreeStore providing filtering functionality.

The functionality of this class can be divided into two sections:

Filtering
=========

Filtering of a tree store is different from filtering flat stores. In a flat store, all nodes (items)
are of the same type and on the same hierarchical level. Filtering can hide any nodes that not matching some criteria.

On the other hand, in tree stores some of the nodes represent parent nodes with child nodes
("parent", "folder", "group" etc) and other nodes are "leaves". And usually a "leaf" node can't be
sufficiently identified w/o its parents - i.e. it is important to know all the parents that
a particular leaf node belongs to. So when filtering tree stores, we need to show all parent nodes of the filtered nodes.

Moreover, filtering is usually being used for searching and thus should ignore the "expanded/collapsed"
state of tree nodes (we need to search among all nodes, including collapsed ones).

Filtering can be activated with the {@link #filterTreeBy} method and cleared with {@link #clearTreeFilter}.

Hiding/Showing nodes
====================

Sometimes we want to keep some nodes in the tree, but remove them from the visual presentation and hide them.
This can be done with {@link #hideNodesBy} method and {@link #showAllNodes} can be used to restore the previous state.
When a node is hidden, all its child nodes are hidden too.

"Hidden" nodes will never appear in filtered results - consider them removed from the tree store completely.
They will, however, appear in a data package for a `store.sync()` operation (you can override the the "filterUpdated" method to exclude them from there if needed).

Note, that it is possible to filter a store with hidden nodes, but not the other way around (hide some nodes of a filtered store).

*/
Ext.define("Sch.data.mixin.FilterableTreeStore", {

    isFilteredFlag                      : false,
    isHiddenFlag                        : false,
    treeFilter                          : null,

    // ref to the last filter applied
    lastTreeFilter                      : null,
    lastTreeHiding                      : null,

    /**
     * @cfg {Boolean} allowExpandCollapseWhileFiltered When enabled (by default), tree store allows user to expand/collapse nodes while it is
     * filtered with the {@link #filterTreeBy} method. Please set it explicitly to `false` to restore the previous behavior,
     * where collapse/expand operations were disabled.
     */
    allowExpandCollapseWhileFiltered    : true,

    /**
     * @cfg {Boolean} reApplyFilterOnDataChange When enabled (by default), tree store will update the filtering (both {@link #filterTreeBy}
     * and {@link #hideNodesBy}) after new data is added to the tree or removed from it. Please set it explicitly to `false` to restore the previous behavior,
     * where this feature did not exist.
     */
    reApplyFilterOnDataChange           : true,

    suspendIncrementalFilterRefresh     : 0,

    filterGeneration                    : 0,
    currentFilterGeneration             : null,

    dataChangeListeners                 : null,
    monitoringDataChange                : false,

    filterUpdateSuspended               : false,

    onClassMixedIn : function (cls) {
        cls.override(Sch.data.mixin.FilterableTreeStore.prototype.inheritables() || {});
    },

     // Events (private)
     //    'filter-set',
     //    'filter-clear',
     //    'nodestore-datachange-start',
     //    'nodestore-datachange-end'

    /**
     * Should be called in the constructor of the consuming class, to activate the filtering functionality.
     */
    initTreeFiltering : function () {
        this.treeFilter = new Ext.util.Filter({
            filterFn    : this.isNodeFilteredIn,
            scope       : this
        });

        this.dataChangeListeners    = {
            nodeappend  : this.onNeedToUpdateFilter,
            nodeinsert  : this.onNeedToUpdateFilter,

            scope       : this
        };

        // in Ext 5.1.1 sencha apparently fixed some issue and now each 'endupdate' on filters
        // lead to view refresh. When store is loading, filter is applied to each record and each time view is refreshed.
        // This code suspend filters until 'load' event is fired
        Ext.apply(this.dataChangeListeners, {
            beforeload  : this.onStoreBeforeLoad,
            load        : this.onStoreLoad
        });
    },

    onStoreBeforeLoad : function () {
        this.filterUpdateSuspended = true;
    },

    onStoreLoad : function () {
        this.filterUpdateSuspended = false;
        this.onNeedToUpdateFilter();
    },

    startDataChangeMonitoring : function () {
        if (this.monitoringDataChange) return;

        this.monitoringDataChange   = true;

        this.on(this.dataChangeListeners);
    },


    stopDataChangeMonitoring : function () {
        if (!this.monitoringDataChange) return;

        this.monitoringDataChange   = false;

        this.un(this.dataChangeListeners);
    },


    onNeedToUpdateFilter : function () {
        if (this.reApplyFilterOnDataChange &&
            !this.filterUpdateSuspended &&
            !this.suspendIncrementalFilterRefresh) this.reApplyFilter();
    },


    /**
     * Clears the current filter (if any).
     *
     * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
     */
    clearTreeFilter : function () {
        if (!this.isTreeFiltered()) return;

        this.currentFilterGeneration = null;
        this.isFilteredFlag     = false;
        this.lastTreeFilter     = null;

        if (!this.isTreeFiltered(true)) this.stopDataChangeMonitoring();

        this.refreshNodeStoreContent();

        this.fireEvent('filter-clear', this);
    },


    reApplyFilter : function () {
        // bypass the nodeStore content refresh if store has both hiding and filtering
        if (this.isHiddenFlag) this.hideNodesBy.apply(this, this.lastTreeHiding.concat(this.isFilteredFlag));

        if (this.isFilteredFlag) this.filterTreeBy(this.lastTreeFilter);
    },


    refreshNodeStoreContent : function () {
        var me      = this,
            filters = me.getFilters();

        if (filters.indexOf(me.treeFilter) < 0) {
            me.addFilter(me.treeFilter);
        } else {
            this.getFilters().fireEvent('endupdate', this.getFilters());
        }
    },


    getIndexInTotalDataset : function (record) {
        var root            = this.getRootNode(),
            index           = -1;

        var rootVisible     = this.rootVisible;

        if (!rootVisible && record == root) return -1;

        var isFiltered      = this.isTreeFiltered();
        var currentFilterGeneration = this.currentFilterGeneration;

        var collectNodes    = function (node) {
            if (isFiltered && node.__filterGen != currentFilterGeneration || node.hidden)
                // stop scanning if record we are looking for is hidden
                if (node == record) return false;

            if (rootVisible || node != root) index++;

            // stop scanning if we found the record
            if (node == record) return false;

            if (!node.isLeaf() && node.isExpanded()) {
                var childNodes  = node.childNodes,
                    length      = childNodes.length;

                for (var k = 0; k < length; k++)
                    if (collectNodes(childNodes[ k ]) === false) return false;
            }
        };

        collectNodes(root);

        return index;
    },

    /**
     * Returns true if this store is currently filtered
     *
     * @return {Boolean}
     */
    isTreeFiltered : function (orHasHiddenNodes) {
        return this.isFilteredFlag || orHasHiddenNodes && this.isHiddenFlag;
    },

    markFilteredNodes : function (top, params) {
        var me                  = this;
        var filterGen           = this.currentFilterGeneration;
        var visibleNodes        = {};

        var root                = this.getRootNode(),
            rootVisible         = this.rootVisible;

        var includeParentNodesInResults = function (node) {
            var parent  = node.parentNode;

            while (parent && !visibleNodes[ parent.internalId ]) {
                visibleNodes[ parent.internalId ] = true;

                parent = parent.parentNode;
            }
        };

        var filter                  = params.filter;
        var scope                   = params.scope || this;
        var shallowScan             = params.shallow;
        var checkParents            = params.checkParents || shallowScan;
        var fullMatchingParents     = params.fullMatchingParents;
        var onlyParents             = params.onlyParents || fullMatchingParents;
        var isNewFilter             = !params.isOldFilter; //  If this filter is a reapplied filter or a brand new

        if (onlyParents && checkParents) throw new Error("Can't combine `onlyParents` and `checkParents` options");

        if (rootVisible) visibleNodes[ root.internalId ] = true;

        var collectNodes    = function (node) {

            if (node.hidden) return;

            var nodeMatches, childNodes, length, k;

            // `collectNodes` should not be called for leafs at all
            if (node.isLeaf()) {
                if (filter.call(scope, node, visibleNodes)) {
                    visibleNodes[ node.internalId ] = true;

                    includeParentNodesInResults(node);
                }
            } else {
                if (onlyParents) {
                    nodeMatches     = filter.call(scope, node);

                    childNodes      = node.childNodes;
                    length          = childNodes.length;

                    if (nodeMatches) {
                        visibleNodes[ node.internalId ] = true;

                        includeParentNodesInResults(node);

                        // if "fullMatchingParents" option enabled we gather all matched parent's sub-tree
                        if (fullMatchingParents) {
                            node.cascadeBy(function (currentNode) {
                                visibleNodes[ currentNode.internalId ] = true;
                            });

                            return;
                        }
                    }

                    // at this point nodeMatches and fullMatchingParents can't be both true
                    for (k = 0; k < length; k++)
                        if (nodeMatches && childNodes[ k ].isLeaf())
                            visibleNodes[ childNodes[ k ].internalId ] = true;
                        else if (!childNodes[ k ].isLeaf())
                            collectNodes(childNodes[ k ]);

                } else {
                    // mark matching nodes to be kept in results
                    if (checkParents) {
                        nodeMatches = filter.call(scope, node, visibleNodes);

                        if (nodeMatches) {
                            visibleNodes[ node.internalId ] = true;

                            includeParentNodesInResults(node);
                        }
                    }

                    // recurse if
                    // - we don't check parents
                    // - shallow scan is not enabled
                    // - shallow scan is enabled and parent node matches the filter or it does not, but its and invisible root, so we don't care
                    if (!checkParents || !shallowScan || shallowScan && (nodeMatches || node == root && !rootVisible)) {
                        childNodes      = node.childNodes;
                        length          = childNodes.length;

                        for (k = 0; k < length; k++) collectNodes(childNodes[ k ]);
                    }
                }
            }
        };

        collectNodes(top);

        // additional filtering of the result set
        // removes parent nodes which do not match filter themselves and have no matching children


        root.cascadeBy(function (node) {
            if (isNewFilter) {
                node.addedWhileFiltered = false;
            }

            if (visibleNodes[ node.internalId ]) {
                node.__filterGen = filterGen;

                if (me.allowExpandCollapseWhileFiltered && !node.isLeaf()) node.expand();
            }
        });

    },


    /**
     * This method filters the tree store. It accepts an object with the following properties:
     *
     * - `filter` - a function to check if a node should be included in the result. It will be called for each **leaf** node in the tree and will receive the current node as the first argument.
     * It should return `true` if the node should remain visible, `false` otherwise. The result will also contain all parents nodes of all matching leafs. Results will not include
     * parent nodes, which do not have at least one matching child.
     * To call this method for parent nodes too, pass an additional parameter - `checkParents` (see below).
     * - `scope` - a scope to call the filter with (optional)
     * - `checkParents` - when set to `true` will also call the `filter` function for each parent node. If the function returns `false` for some parent node,
     * it could still be included in the filtered result if some of its children match the `filter` (see also "shallow" option below). If the function returns `true` for a parent node, it will be
     * included in the filtering results even if it does not have any matching child nodes.
     * - `shallow` - implies `checkParents`. When set to `true`, it will stop checking child nodes if the `filter` function return `false` for a parent node. The whole sub-tree, starting
     * from a non-matching parent, will be excluded from the result in such case.
     * - `onlyParents` - alternative to `checkParents`. When set to `true` it will only call the provided `filter` function for parent tasks. If
     * the filter returns `true`, the parent and all its direct child leaf nodes will be included in the results. If the `filter` returns `false`, a parent node still can
     * be included in the results (w/o direct children leafs), if some of its child nodes matches the filter.
     * - `fullMatchingParents` - implies `onlyParents`. In this mode, if a parent node matches the filter, then not only its direct children
     * will be included in the results, but the whole sub-tree, starting from the matching node.
     *
     * Repeated calls to this method will clear previous filters.
     *
     * This function can be also called with 2 arguments, which should be the `filter` function and `scope` in such case.
     *
     * For example:

    treeStore.filterTreeBy({
        filter          : function (node) { return node.get('name').match(/some regexp/) },
        checkParents    : true
    })

    // or, if you don't need to set any options:
    treeStore.filterTreeBy(function (node) { return node.get('name').match(/some regexp/) })

     *
     * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
     *
     * @param {Object} params
     */
    filterTreeBy : function (params, scope) {
        this.currentFilterGeneration = this.filterGeneration++;

        var filter;

        if (arguments.length == 1 && Ext.isObject(arguments[ 0 ])) {
            scope       = params.scope;
            filter      = params.filter;
        } else {
            filter      = params;
            params      = { filter : filter, scope : scope };
        }

        this.fireEvent('nodestore-datachange-start', this);

        params                      = params || {};

        this.markFilteredNodes(this.getRootNode(), params);

        params.isOldFilter = true;

        this.startDataChangeMonitoring();

        this.isFilteredFlag     = true;
        this.lastTreeFilter     = params;

        //this.fireEvent('clear', this);

        this.fireEvent('nodestore-datachange-end', this);

        this.fireEvent('filter-set', this);

        this.refreshNodeStoreContent();
    },


    isNodeFilteredIn : function (node) {
        var isFiltered              = this.isTreeFiltered();
        var currentFilterGeneration = this.currentFilterGeneration;

        return this.loading ||
            // If node was added with active filter, it should always be shown if (reApplyFilterOnDataChange) until
            // the next call to filterTreeBy
            (node.addedWhileFiltered && node.isVisible()) ||
            !Boolean(isFiltered && node.__filterGen != currentFilterGeneration || node.hidden);
    },


    hasNativeFilters : function () {
        var me      = this,
            filters = me.getFilters(),
            count   = filters.getCount();

        return (count && count > 1) || filters.indexOf(me.treeFilter) < 0;
    },


    /**
     * Hide nodes from the visual presentation of tree store (they still remain in the store).
     *
     * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
     *
     * @param {Function} filter - A filtering function. Will be called for each node in the tree store and receive
     * the current node as the 1st argument. Should return `true` to **hide** the node
     * and `false`, to **keep it visible**.
     * @param {Object} scope (optional).
     */
    hideNodesBy : function (filter, scope, skipNodeStoreRefresh) {
        var me      = this;

        if (me.isFiltered() && me.hasNativeFilters()) throw new Error("Can't hide nodes of a filtered tree store");

        scope       = scope || me;

        me.getRootNode().cascadeBy(function (node) {
            node.hidden = Boolean(filter.call(scope, node, me));
        });

        me.startDataChangeMonitoring();

        me.isHiddenFlag     = true;
        me.lastTreeHiding   = [ filter, scope ];

        if (!skipNodeStoreRefresh) me.refreshNodeStoreContent();
    },


    /**
     * Shows all nodes that was previously hidden with {@link #hideNodesBy}
     *
     * See also {@link Sch.data.mixin.FilterableTreeStore} for additional information.
     */
    showAllNodes : function (skipNodeStoreRefresh) {
        this.getRootNode().cascadeBy(function (node) {
            node.hidden     = false;
        });

        this.isHiddenFlag       = false;
        this.lastTreeHiding     = null;

        if (!this.isTreeFiltered(true)) this.stopDataChangeMonitoring();

        if (!skipNodeStoreRefresh) this.refreshNodeStoreContent();
    },


    inheritables : function () {
        return {
            // @OVERRIDE
            onNodeExpand: function (parent) {
                if (this.isTreeFiltered(true) && parent == this.getRoot()) {
                    this.callParent(arguments);
                    // the expand of the root node - most probably its the data loading
                    this.reApplyFilter();
                } else
                    return this.callParent(arguments);
            },

            // @OVERRIDE
            onNodeCollapse: function (parent, records) {
                var me                      = this;
                var data                    = me.data;
                var prevContains            = data.contains;

                var isFiltered              = me.isTreeFiltered();
                var currentFilterGeneration = me.currentFilterGeneration;

                // the default implementation of `onNodeCollapse` only checks if the 1st record from collapsed nodes
                // exists in the node store. Meanwhile, that 1st node can be hidden, so we need to check all of them
                // thats what we do in the `for` loop below
                // then, if we found a node, we want to do actual removing of nodes and we override the original code from NodeStore
                // by always returning `false` from our `data.contains` override
                data.contains           = function () {
                    var node, sibling, lastNodeIndexPlus;

                    var collapseIndex   = me.indexOf(parent) + 1;
                    var found           = false;

                    for (var i = 0; i < records.length; i++)
                        if (
                            !(records[ i ].hidden || isFiltered && records[ i ].__filterGen != currentFilterGeneration) &&
                            prevContains.call(this, records[ i ])
                        ) {
                            // this is our override for internal part of `onNodeCollapse` method

                            // Calculate the index *one beyond* the last node we are going to remove
                            // Need to loop up the tree to find the nearest view sibling, since it could
                            // exist at some level above the current node.
                            node = parent;
                            while (node.parentNode) {
                                sibling = node;
                                do {
                                    sibling = sibling.nextSibling;
                                } while (sibling && (sibling.hidden || isFiltered && sibling.__filterGen != currentFilterGeneration));

                                if (sibling) {
                                    found = true;
                                    lastNodeIndexPlus = me.indexOf(sibling);
                                    break;
                                } else {
                                    node = node.parentNode;
                                }
                            }
                            if (!found) {
                                lastNodeIndexPlus = me.getCount();
                            }

                            // Remove the whole collapsed node set.
                            me.removeAt(collapseIndex, lastNodeIndexPlus - collapseIndex);

                            break;
                        }

                    // always return `false`, so original NodeStore code won't execute
                    return false;
                };

                this.callParent(arguments);

                /* HACK in case no records are deemed visible we need to handle things ourselves */
                if (this.isTreeFiltered()) {

                    if (me.needsLocalFilter()) {
                        records = Ext.Array.filter(records, me.filterVisible);
                    }

                    // 'parent' can be filtered out, in such case we don't need to remove anything
                    // covered by 124_tree_filter
                    if (!records.length && me.indexOf(parent) !== -1) {
                        var collapseIndex       = me.indexOf(parent) + 1;
                        var lastNodeIndexPlus   = me.indexOfNextVisibleNode(parent);

                        me.removeAt(collapseIndex, lastNodeIndexPlus - collapseIndex);
                    }
                }

                data.contains           = prevContains;
            },

            // @OVERRIDE
            handleNodeExpand : function (parent, records, toAdd) {
                var me                      = this;
                var visibleRecords          = [];
                var isFiltered              = me.isTreeFiltered();
                var currentFilterGeneration = me.currentFilterGeneration;

                for (var i = 0; i < records.length; i++) {
                    var record          = records[ i ];

                    if (
                        !(isFiltered && record.__filterGen != currentFilterGeneration || record.hidden)
                    ) {
                        visibleRecords[ visibleRecords.length ] = record;
                    }
                }

                return this.callParent([ parent, visibleRecords, toAdd ]);
            },

            // @OVERRIDE
            onNodeInsert: function(parent, node, index) {
                var me = this,
                    refNode,
                    sibling,
                    storeReader,
                    nodeProxy,
                    nodeReader,
                    reader,
                    data = node.raw || node.data,
                    removed = me.removedNodes,
                    dataRoot,
                    isVisible,
                    childType,
                    isTreeFiltered = this.isTreeFiltered();

                if (me.filterFn) {
                    isVisible = me.filterFn(node);
                    node.set('visible', isVisible);

                    // If a node which passes the filter is added to a parent node
                    if (isVisible) {
                        parent.set('visible', me.filterFn(parent));
                    }
                }

                if (!this.reApplyFilterOnDataChange && isTreeFiltered) {
                    node.addedWhileFiltered = true;
                }

                // Register node by its IDs
                me.registerNode(node, true);

                me.beginUpdate();

                // Only react to a node append if it is to a node which is expanded.
                if (me.isVisible(node) || (isTreeFiltered && node.addedWhileFiltered)) {
                    if (index === 0 || !node.previousSibling) {
                        refNode = parent;
                    } else {
                        // Find the previous visible sibling (filtering may have knocked out intervening nodes)
                        for (sibling = node.previousSibling; sibling && !sibling.addedWhileFiltered && !sibling.get('visible'); sibling = sibling.previousSibling);
                        if (!sibling) {
                            refNode = parent;
                        } else {
                            while (sibling.isExpanded() && sibling.lastChild) {
                                sibling = sibling.lastChild;
                            }

                            // The chosen sibling here might be filtered out too
                            for (; sibling && !sibling.addedWhileFiltered && !sibling.get('visible'); sibling = sibling.previousSibling);

                            refNode = sibling;
                        }
                    }

                    // The reaction to collection add joins the node to this Store
                    me.insert(me.indexOf(refNode) + 1, node);
                    if (!node.isLeaf() && node.isExpanded()) {
                        if (node.isLoaded()) {
                            // Take a shortcut
                            me.onNodeExpand(node, node.childNodes);
                        } else if (!me.fillCount) {
                            // If the node has been marked as expanded, it means the children
                            // should be provided as part of the raw data. If we're filling the nodes,
                            // the children may not have been loaded yet, so only do this if we're
                            // not in the middle of populating the nodes.
                            node.set('expanded', false);
                            node.expand();
                        }
                    }
                }

                // Set sync flag if the record needs syncing.
                //else {
                //    me.needsSync = me.needsSync || node.phantom || node.dirty;
                //}

                // In case the node was removed and added to the removed nodes list.
                Ext.Array.remove(removed, node);
                // New nodes mean we need a sync if those nodes are phantom or dirty (have client-side only information)
                me.needsSync = me.needsSync || node.phantom || node.dirty;

                if (!node.isLeaf() && !node.isLoaded() && !me.lazyFill) {
                    // With heterogeneous nodes, different levels may require differently configured readers to extract children.
                    // For example a "Disk" node type may configure it's proxy reader with root: 'folders', while a "Folder" node type
                    // might configure its proxy reader with root: 'files'. Or the root property could be a configured-in accessor.
                    storeReader = me.getProxy().getReader();
                    nodeProxy = node.getProxy();
                    nodeReader = nodeProxy ? nodeProxy.getReader() : null;

                    // If the node's reader was configured with a special root (property name which defines the children array) use that.
                    reader = nodeReader && nodeReader.initialConfig.rootProperty ? nodeReader : storeReader;

                    dataRoot = reader.getRoot(data);
                    if (dataRoot) {
                        childType = node.childType;
                        me.fillNode(node, reader.extractData(dataRoot, childType ? {
                            model: childType
                        } : undefined));
                    }
                }
                me.endUpdate();
            },

            isFiltered : function () {
                return this.callParent(arguments) || this.isTreeFiltered();
            },

            afterEdit: function(node, modifiedFieldNames) {
                var me = this;

                // In Ext 6.0.2 sencha decided that tree should be filtered again after data is changed
                // Prior to 6.0.2 they used to apply filter only to new node
                if (Ext.getVersion().isGreaterThan('6.0.2')) {
                    if (me.needsLocalFilter()) {
                        me.doFilter(node);
                    }
                    me.superclass.superclass.afterEdit.apply(me, [
                        node,
                        modifiedFieldNames
                    ]);
                } else {
                    return me.callParent([node, modifiedFieldNames]);
                }
            }
        };
    }
});
