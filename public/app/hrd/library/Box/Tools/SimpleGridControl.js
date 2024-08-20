Ext.define('Hrd.library.box.tools.SimpleGridControl', {
    id: null,
    _view: null,
    _gridId: null,
    _formId: null,
    _methodName: "sgcPanel",
    _methodList: ["afterDelete","afterEdit"],
    _storedComboBox: [],
    constructor: function(options) {
        Ext.apply(this, options || {});
        this._formId = this._gridId + 'FormId';
    },
    getEvents: function(ctrl, grid) {
        var events = {};
        var me = this;
        events[grid] = {
            itemdblclick: function() {
                me._showForm(ctrl, 0);
            }
        };
        events['#' + me._formId] = {
            afterrender: function() {
                me._fdar(ctrl);
            }
        };
        events[grid + ' toolbar button[action=create]'] = {
            click: function(el) {

                me._showForm(ctrl, 1);
            }
        };
        events[grid + ' toolbar button[action=update]'] = {
            click: function(el) {
                me._showForm(ctrl, 0);
            }
        };
        events[grid + ' toolbar button[action=destroy]'] = {
            click: function() {
                me._doDelete(ctrl);
            }
        };
        events[grid + ' actioncolumn'] = {
            click: function(view, cell, row, col, e) {
                me._actionColumnClick(ctrl, view, cell, row, col, e);
            }

        };
        events['#' + me._formId + ' button[action=save]'] = {
            click: function() {
                me._doSave();
            }
        };
        return events;
    },
    /*private*/
    _fdar: function(ctrl) {
        var me = this;
        var f = me.getForm();
        var cb = me._storedComboBox;
        for (var c in cb) {
            var cmp = f.down("[name=" + cb[c] + "]");
            if (cmp) {
                f.down("[name=" + cb[c] + "]").bindPrefixName = ctrl.controllerName;
                f.down("[name=" + cb[c] + "]").doInit(true, function() {
                    f.setLoading(false);
                });
            }

        }
    },
    _gridExists: function() {

    },
    _showForm: function(ctrl, isCreate) {
        var me = this;
        var mode = isCreate ? "create" : "update";

        if (!isCreate) {
            me._loadData(ctrl);
        } else {
            me._instantWindow(ctrl, '', 500, 'Form ' + mode, mode, 'SGF' + me._gridId);
        }


    },
    _instantWindow: function(ctrl, panel, width, title, state, id) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {

            var form = null;
            if (me._view) {
                form = Ext.create(ctrl.myConfig.getViewFolder() + '' + me._view);
            } else {
                form = me._createForm(ctrl);
            }

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
                items: form,
                state: state
            });
        }
        win.show();
    },
    _createForm: function(ctrl) {
        var me = this;
        var g = null;
        var items = [];
        if (!me._gridId) {
            console.log("[ERSGC] Grid selector is null");


            return false;
        } else {
            g = Ext.getCmp(me._gridId);
            if (!g) {
                console.log("[ERSGC] Grid not found");
                return false;
            }
        }

        var cols = g.columns;
        for (var i = 0; i < cols.length; i++) {
            var cmp = me._createField(ctrl, cols[i]);

            if (cmp) {
                items.push(cmp);
            }

        }

        /* action column */


        var form = Ext.create('Ext.form.Panel', {
            id: me._formId,
            bodyStyle: 'padding:5px 5px 0',
            width: 350,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 75
            },
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: items,
            buttons: [{
                    text: 'Save',
                    action: 'save'
                }, {
                    text: 'Cancel',
                    action: 'cancel',
                    handler: function() {
                        this.up('window').close();
                    }
                }],
        });
        return form;
    },
    _createField: function(ctrl, cols) {
        var cmp = null;
        var xtype = cols.xtype;
        var me = this;

        if (cols.dataIndex) {
            var cmpDefault = {
                xtype: 'textfield',
                fieldLabel: cols.text,
                name: cols.dataIndex
            };
            switch (xtype) {
                case 'rownumberer':
                    break;
                case 'datecolumn':
                    cmpDefault['xtype'] = 'datefield';
                    cmpDefault['format'] = cols.format;
                    cmpDefault['submitFormat'] = 'c';
                    break;
                default:
                    cmpDefault['xtype'] = 'textfield';
                    break;
            }
            if (typeof cols.helperName !== "undefined") {
                cmpDefault = ctrl.sgcHelper[cols.helperName](cols);
            }
            if (typeof cols.helperComboBox !== "undefined") {
                var nm = cols.dataIndex
                cmpDefault = {xtype: cols.helperComboBox, name: cols.dataIndex, fieldLabel: cols.text};
                if (typeof cols.idFieldName !== "undefined") {
                    cmpDefault["name"] = cols.idFieldName;
                    cmpDefault["idFieldName"] = cols.dataIndex;
                    nm = cols.idFieldName;

                    /// added 20 Agustus 2014



                }
                me._storedComboBox.push(nm);
            }

            cmp = cmpDefault;
        }

        return cmp;
    },
    _doSave: function() {
        var me = this;
        var f = Ext.getCmp(me._formId);
        var g = Ext.getCmp(me._gridId);
        var s = g.getStore();

        if (!f) {
            console.log("[ERSGC] Form not found");
            return false;
        }
        if (s.storeId === "ext-empty-store") {
            console.log("[ERSGC] Store of the Grid is empty");
        } else {
            var state = null;
            state = f.up("window").state;
            if (state == "create") {
                var values = f.getValues();
                /* check if add another value*/
                var fields = f.getForm().getFields().items;
                for (var i in fields) {

                    if (typeof fields[i].idFieldName !== "undefined") {
                        var oriField = fields[i].idFieldName;
                        var field = oriField.split("_");
                        field.splice(0, 1);
                        field = field.join("_");
                        var combo = fields[i];

                        var name = combo.name.split("_");
                        name.splice(0, 1);
                        name = name.join("_");

                        var r = combo.getStore().find(name, combo.getValue());


                        values[oriField] = combo.getStore().getAt(r).get(field);
                    }
                }


                /* add to store*/
                s.add(values);
            } else {

                var rec = g.getSelectedRecord();

                if (rec) {
                    rec.beginEdit();
                    rec.set(f.getValues());
                    rec.endEdit();

                    // added 20 Agustus 2014
                    var mt = me.getMethod();

                    if (mt) {
                        var methodName = me._methodList[1];
                        if (typeof mt[methodName] === "function") {
                            mt[methodName](f,rec);
                        }
                    }

                } else {
                    Ext.Msg.alert('Alert', 'No record found.');

                }
            }



            f.up("window").close();
        }

    },
    _loadData: function(ctrl) {
        var me = this;

        var g = Ext.getCmp(me._gridId);
        var s = g.getStore();


        if (s.storeId === "ext-empty-store") {
            console.log("[ERSGC] Store of the Grid is empty");
        } else {
            var rec = g.getSelectedRecord();

            if (rec) {
                me._instantWindow(ctrl, '', 500, 'Form Update', 'update', 'simpleGridForm');
                var f = Ext.getCmp(me._formId);

                if (!f) {
                    console.log("[ERSGC] Form not found");
                    return false;
                }

                f.loadRecord(rec);

            } else {
                Ext.Msg.alert('Alert', 'Please select record first.');

            }

        }
    },
    _doDelete_old: function(ctrl, currentRow) {
        var me = this;
        var g = me.getGrid();
        if (!g) {
            return false;

        }
        var row = -1;
        var cr = typeof currentRow === "undefined" ? -1 : currentRow;
        if (cr > -1) {
            row = currentRow;
        } else {
            row = g.getSelectedRow();
        }

        if (row > -1) {
            //console.log(g.getStore().getAt(row).internalId);
            var rec = g.getStore().getAt(row);
            g.getStore().removeAt(row);
            var mt = me.getMethod();

            if (mt) {
                if (typeof mt[me._methodList[0]] === "function") {
                    mt[me._methodList[0]](ctrl, rec);
                }
            }



        }
    },
	//edited by ahmad riadi 25-09-2017
     _doDelete: function (ctrl, currentRow) {
        var rows, me, grid, recordcounttext, store, selectedRecord, confirmmsg, record,counter;
        me = this;
        grid = me.getGrid();
        if (!grid) {
            return false;

        }
        rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();
            if (rows.length == 1) {
                confirmmsg = 'Delete on Selected data ?';
            } else {
                confirmmsg = 'Delete Multiple Selected data ?';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();   
                    counter = store.getCount();
                    msg = function () {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);                          
                        store.remove(record);   
                        var mt = me.getMethod();
                        if (mt) {
                            if (typeof mt[me._methodList[0]] === "function") {
                                mt[me._methodList[0]](ctrl, record);
                            }
                        }
                    }
                }

            });
            
        }

    },

    _actionColumnClick: function(ctrl, view, cell, row, col, e) {
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        var me = this;
        me.getGrid().getSelectionModel().select(row);
        var me = this;
        if (m) {
            var action = m[1];
            if (action == "destroy") {
                me._doDelete(ctrl, row);
            } else if (action == "update") {
                me._showForm(ctrl, 0);
            }
        }

    },
    getForm: function() {
        return Ext.getCmp(this._formId);
        ;
    },
    getGrid: function() {
        return Ext.getCmp(this._gridId);
    },
    getMethod: function() {
        var me = this;
        if (typeof me._methodName === "object") {
            if (typeof me._methodName[me._gridId] === "object") {
                return me._methodName[me._gridId];
            } else {
                console.log("[ERSGC] Method Panel for " + me._gridId + " not found");
            }
        } else {
            console.log("[ERSGC] Method Panel not found for" + me._gridId);
        }
        return false;
    }
});