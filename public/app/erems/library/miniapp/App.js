Ext.define('Erems.library.miniapp.App', {
    winId: 'miniAppWin',
    id: 'miniApp',
    callerId: '',
    modulId: '',
    loadParams:{},
    params: {
        window: {
            width: 600
        },
        panel: {
            view: '',
            height: 300,
            formSearchView: 'Erems.library.miniapp.view.FormSearch'
        },
        grid: {
            view: '',
            store: '',
            columns: [],
            bodyColumns: []
        },
        store: {
            urlRead: ''
        }
    },
    setConfig: function(config) {
        if (typeof config != 'object')
            return;
        if (typeof config.urlRead != 'undefined')
            this.params.store.urlRead = config.urlRead;
        if (typeof config.columns != 'undefined')
            this.params.grid.columns = config.columns;
        if (typeof config.formSearchView != 'undefined')
            this.params.panel.formSearchView = config.formSearchView;
        if (typeof config.modulId != 'undefined')
            this.modulId = config.modulId;
        if (typeof config.callerId != 'undefined')
            this.callerId = config.callerId
        if (typeof config.loadParams != 'undefined'){
            if(typeof config.loadParams=='object'){
                this.loadParams = config.loadParams
            }
        }
            
    },
    panel: function() {
        var me = this;
        var p = {
            // view:'Erems.library.miniapp.view.Panel',
            getEl: function() {
                return me.window().getEl().down("panel");
            },
            getView: function() {
                return me.params.panel.view;
            },
            setView: function(view) {
                me.params.panel.view = view;
            },
            getFormSearchView: function() {
                return me.params.panel.formSearchView;
            },
            create: function() {
                var panel = null;
                var v = this.getView();
                v = v == null ? '' : v;

                //panel = Ext.create('Erems.library.miniapp.view.Panel');
                var formSearch = Ext.create(me.panel().getFormSearchView());
                var gridPanel = Ext.create('Erems.library.miniapp.view.Grid');

                panel = Ext.create('Ext.panel.Panel', {
                    //requires: ['Erems.library.miniapp.view.Grid', 'Erems.library.miniapp.view.FormSearch'],
                    itemId: 'MiniAppViewPanel',
                    height: 300,
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {xtype: gridPanel.getXType(), region: 'center'},
                        {xtype: formSearch.getXType(), region: 'west',
                            split: true,
                            maxWidth: 500,
                            minWidth: 300,
                            width: 300,
                            collapsed: true,
                            collapsible: true,
                            iconCls: 'icon-search',
                            title: 'Search'}
                    ]
                });



                var panelFS = panel.down("panel"); /// panel form search
                var grid = panel.down("grid");
                grid.reconfigure(me.store().create(), me.grid().getBodyColumns());

                panel.down("button[action=search]").on("click", function(el) {
                    me.fn.dataSearch(el);
                }, this);

                panel.down("button[action=reset]").on("click", function(el) {
                    me.fn.dataReset(el);
                }, this);

                panel.down("button[action=select]").on("click", function(el) {
                    me.fn.dataSelect(el, me.callerId, me.modulId);
                }, this);


                return panel;
            }
        };
        return p;
    },
    model: function() {
        var me = this;
        var m = {
            getId: function() {
                return me.id + '_ma_Model_a';
            }
        };
        return m;
    },
    store: function() {
        var me = this;
        var s = {
            getId: function() {
                return me.id + '_ma_Store_a';
            },
            getUrlRead: function() {
                return me.params.store.urlRead;
            },
            create: function() {
                var arFields = [];
                var gridCols = [];
                var cols = me.grid().getColumns();
                var xt = '', al = '';
                for (var x = 0; x < cols.length; x++) {
                    if (typeof cols[x].hidden == 'undefined' || cols[x].hidden == false) {
                        xt = typeof cols[x].xtype == 'undefined' ? 'gridcolumn' : cols[x].xtype;
                        al = typeof cols[x].align == 'undefined' ? 'left' : cols[x].align;

                        gridCols.push({text: cols[x].text, dataIndex: cols[x].dataIndex, xtype: xt, align: al});
                    } 
                    arFields.push({name: cols[x].dataIndex, type: 'string'});
                }
                ;

                me.params.grid.bodyColumns = gridCols;

                Ext.define(me.model().getId(), {
                    extend: 'Ext.data.Model',
                    fields: arFields
                });

                var myStore = Ext.create('Ext.data.Store', {
                    model: me.model().getId(),
                    proxy: {
                        type: 'ajax',
                        actionMethods: {
                            read: 'POST'
                        },
                        api: {
                            read: me.store().getUrlRead()
                        },
                        reader: {
                            type: 'json',
                            idProperty: 'example_id',
                            root: 'data'
                        },
                        writer: {
                            type: 'json',
                            encode: true,
                            root: 'data'
                        },
                        extraParams:me.loadParams
                    }
                });
                return myStore;
            }
        };
        return s;
    },
    grid: function() {
        var me = this;
        var g = {
            getEl: function() {
                return me.panel().getEl().down("grid");
            },
            getColumns: function() {
                return me.params.grid.columns;
            },
            getBodyColumns: function() {
                return me.params.grid.bodyColumns;
            },
            afterRender: function() {
                var store = this.getEl().getStore();
                var grid = this;
                var params = me.loadParams;
              
                store.load({
                    callback: function(rec) {

                    }
                });
            },
            addColumn: function() {

            },
            getStore: function() {
                return me.params.grid.store;
            },
            create: function() {
                var grid = null;
                grid = Ext.create(me.params.grid.view);
                grid.region = 'center';
                return grid;
            }
        };
        return g;
    },
    window: function() {
        var me = this;
        var win = {
            getEl: function() {
                return Ext.WindowMgr.get(me.winId);
            },
            show: function(state, width, title, id) {


                if (me.store().getUrlRead().length < 5) {
                    console.log("[Error]Url read of store is not defined");
                    return false;
                } else if (me.grid().getColumns().length < 1) {
                    console.log("[Error]Columns is not defined");
                    return false;
                } else if (me.panel().getFormSearchView().length < 1) {
                    console.log("[Error]Form Search View is not defined");
                    return false;
                }

                var formtitle, formicon;
                var panel = '';

                title = typeof title == 'undefined' ? 'My Window' : title;
                id = typeof id == 'undefined' ? 'myMiniAppWindow' : id;
                state = typeof state == 'undefined' ? 'create' : state;
                panel = me.viewPanel;
                width = typeof width == 'undefined' ? 600 : me.params.window.width;
                formtitle = title;
                formicon = 'icon-form-add';
                var winId = id;

                me.winId = winId;


                var win = desktop.getWindow(winId);
                if (!win) {
                    win = desktop.createWindow({
                        id: winId,
                        title: formtitle,
                        iconCls: formicon,
                        resizable: false,
                        minimizable: false,
                        maximizable: false,
                        width: width,
                        renderTo: Ext.getBody(),
                        constrain: true,
                        constrainHeader: false,
                        modal: true,
                        layout: 'fit',
                        shadow: 'frame',
                        shadowOffset: 10,
                        border: false,
                        items: me.panel().create(),
                        state: state
                    });

                }
                win.show();

                me.grid().afterRender();

            }
        };
        return win;
    },
    fn: {
        dataSearch: function(el) {
            var fields = el.up('form').getValues();
            var store = el.up('#MiniAppViewPanel').down('grid').getStore();
            for (var x in fields)
            {
                store.getProxy().setExtraParam(x, fields[x]);
            }
            
            store.loadPage(1);
        },
        dataReset: function(el) {

            el.up('form').getForm().reset();
            this.dataSearch(el);
        },
        dataSelect: function(el, callerId, modulId) {
            var grid = el.up('#MiniAppViewPanel').down('grid');
            var myRow = grid.getView().getSelectionModel().getSelection()[0];
            if (typeof myRow != 'undefined') {
                var rec = grid.getStore().getAt(myRow.index).data;
                el.up('window').destroy();
                _Apps.getController(callerId).processRowFromItemSelection(rec, modulId);

            } else {
                Ext.Msg.alert('Info', 'Require 1 unit!');
            }

        }
    }
});

