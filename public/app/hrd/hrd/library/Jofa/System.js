Ext.define('Hrd.library.jofa.System', {
    requires: ['Hrd.library.jofa.Grid', 'Hrd.library.jofa.Tools'],
    grid: null, // grid handler
    tools: null,
    config: null,
    hasDetail: false,
    detailGridId: null,
    idProperty: null,
    cName: null, // controller name,
    comboBoxList: [], // fill with this -> [{cbf:department,name:department}]
    constructor: function(options) {
        Ext.apply(this, options || {});
        this.grid = new Hrd.library.jofa.Grid({
            cName: this.cName
        });
        this.tools = new Hrd.library.jofa.Tools();

    },
    init: function() {

    },
    selectRecord: function() {

    },
    filterRecord: function() {

    },
    getc: function() {
        return _Apps.getController(this.cName);
    },
    panelAfterRender: function(el) {
        var me = this;
        var c = this.getc();

        if (c.isMaximize) {
            el.up("window").maximize();
        }
        var g = c.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');
        c.getPanel().setLoading(false);



        // set tool [CRUD] in grid
        this.tools.changeState(me, 'FIRST');

        // attach on select event to grid
        g.removeListener('selectionchange');
        g.on('selectionchange', function(view, record, item, index, eventobj, obj) {
            me.selectOneRecord(record[0]);
        });
        g.down('toolbar button[action=create]').on('click', function() {
            g.getView().setDisabled(true);
            me.getc().getFormdata().editedRow = -1;
            
            var f = me.getc().getFormdata();
            f.getForm().reset();
            var selectedRecord = null;
            if (me.hasDetail) {
                selectedRecord = me.getc().getGrid().getSelectedRecord();
                f.loadRecord(selectedRecord);
                me.getDetailGrid().getView().setDisabled(true);
            }

            if (typeof me.getc().sysfunc === 'function') {
                me.getc().sysfunc().clickNew(selectedRecord);
            }
            me.tools.changeState(me, 'ONNEW');
        });
        g.down('toolbar button[action=edit]').on('click', function() {
            g.getView().setDisabled(true);
            var gridProcess = g;
            me.tools.changeState(me, 'ONNEW');
            if (typeof me.getc().sysfunc === 'function') {
                me.getc().sysfunc().clickEdit();
            }
            if (me.hasDetail) {
                g = me.getDetailGrid();
                g.getView().setDisabled(true);
            }
            var rec = g.getSelectedRecord();
            if(rec){
                me.getc().getFormdata().editedRow = g.getStore().findExact(me.idProperty,rec.get(me.idProperty));
            }
            
        });
        g.down('toolbar button[action=cancel]').on('click', function() {
            g.getView().setDisabled(false);
            me.tools.changeState(me, 'FIRST');
            if (typeof me.getc().sysfunc === 'function') {
                me.getc().sysfunc().clickCancel();
            }
            if (me.hasDetail) {
                me.getDetailGrid().getView().setDisabled(false);
            }
        });
        g.down('toolbar button[action=save]').on('click', function() {
            me.save();
        });
        g.down('toolbar button[action=delete]').on('click', function() {
            me.delete();
        });

        if (me.hasDetail && me.detailGridId) {
            var gd = this.getDetailGrid();
            gd.doInit();
            gd.getSelectionModel().setSelectionMode('SINGLE');

            gd.on('selectionchange', function(view, record, item, index, eventobj, obj) {
                //me.grid.selectionChange(me, record[0]);
                if (record[0]) {
                    me.getc().getFormdata().loadRecord(record[0]);
                }
                me.tools.changeState(me, 'ONSELECT');


                /// check if controller have funct to call
                if (typeof me.getc().sysfunc === 'function') {

                    me.getc().sysfunc().gridDetailSelectionChange();
                }
            });

        }


    },
    delete: function() {
        var me = this;
        var g = me.getc().getGrid();
        if (me.hasDetail) {
            g = me.getDetailGrid();
        }
        var rec = g.getSelectedRecord();
        if (rec) {
            Ext.Msg.show({
                title: 'Confirm',
                msg: 'Do you want delete this data?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(clicked) {
                    if (clicked === "yes") {
                        g.getStore().remove(rec);
                        var p = me.getc().getPanel();
                        p.setLoading("Deleting your data...");
                        g.getStore().sync({
                            success: function(batch, op) {
                                me.getc().tools.alert.info("Deleted.");
                                p.setLoading(false);
                                var rec = me.getc().getGrid().getSelectedRecord();
                                if (rec) {
                                    me.selectOneRecord(rec);
                                }


                            },
                            failure: function(batch, op) {
                                var erMsg = "Unable to process data.";
                                var jsD = batch.proxy.getReader().jsonData;
                                var isError = batch.operations[0].error;
                                if (!isError) {
                                    if (typeof jsD.msg !== "undefined") {
                                        erMsg = jsD.msg;
                                    }
                                    me.getc().tools.alert.warning(erMsg);
                                } else {
                                    me.getc().tools.alert.error(erMsg);
                                }



                                p.setLoading(false);

                                // s.getAt(s.getCount() - 1).commit();
                            }

                        });
                    }
                }
            });
        }
    },
    save: function() {
        console.log("save");
        var me = this;
        var s = null;
        var c = me.getc();
        var g = c.getGrid();
        var f = c.getFormdata();
        var p = c.getPanel();
        if (me.hasDetail) {
            g = p.down('#' + me.detailGridId);
        }
        var isNew = false;
        s = g.getStore();
        if (f.down("[name=" + me.idProperty + "]").getValue() > 0) {
            var rec = g.getSelectedRecord();
            rec.beginEdit();
            rec.set(f.getValues());
            rec.endEdit();

        } else {
            isNew = true;
            s.add(f.getValues());
        }

        p.setLoading("Saving your data...");
        s.sync({
            success: function(batch, op) {
                c.tools.alert.info("Success.");
                p.setLoading(false);
                me.selectOneRecord(me.getc().getGrid().getSelectedRecord());
                me.getc().getGrid().getView().disabled(false);
            },
            failure: function(batch, op) {
                var erMsg = "Unable to process data.";
                var jsD = batch.proxy.getReader().jsonData;
                var isError = batch.operations[0].error;
                if (!isError) {
                    if (typeof jsD.msg !== "undefined") {
                        erMsg = jsD.msg;
                    }
                    c.tools.alert.warning(erMsg);
                } else {
                    c.tools.alert.error(erMsg);
                }

                if (isNew) {
                    s.removeAt(s.getCount() - 1);
                }

                p.setLoading(false);

                // s.getAt(s.getCount() - 1).commit();
            }

        });


    },
    afterGridLoad: function() {
        var me = this;
        var g = me.getc().getGrid();
        me.getc().gridLoaded = true;
        // select on record
        if (g.getStore().getCount() > 0) {
            g.getSelectionModel().select(0);
        }

        // load combo box record if needed
        if (me.comboBoxList.length > 0) {
            var c = this.getc();
            var p = c.getPanel();
            var f = c.getFormdata();
            p.setLoading("Loading components...");
            c.tools.ajax({
                params: me.getc().sysfunc().getParams('detailRead'),
                success: function(data, model) {
                    p.setLoading(false);
                    for (var i in me.comboBoxList) {
                        c.tools.wesea(data[me.comboBoxList[i].cbf], f.down("[name=" + me.comboBoxList[i].name + "]")).comboBox();
                    }
                    if (typeof me.getc().sysfunc === 'function') {

                        me.getc().sysfunc().detailReadLoaded(data);
                    }

                }
            }).read('detail');
        }

        // if has detail
        if (me.hasDetail && me.detailGridId) {
            var gd = this.getDetailGrid();

            // gd.getStore().loadData([], false);
            /*  gd.getStore().loadPage(1, {
             params: {},
             callback: function(recsf, opf) {
             gd.attachModel(opf);
             }
             });*/
        }


    },
    selectOneRecord: function(rec) {
        var me = this;
        //me.grid.selectionChange(me, record[0]);
        var f = me.getc().getFormdata();
        f.getForm().reset();
        if (rec) {
            f.loadRecord(rec);
        }

        /// if has detail
        if (me.hasDetail) {
            me.getDetailGrid().getStore().loadData([], false);
            me.tools.changeState(me, 'FIRST');
        } else { /// form master module
            me.tools.changeState(me, 'ONSELECT');

        }

        /// check if controller have funct to call
        if (typeof me.getc().sysfunc === 'function') {
            me.getc().sysfunc().gridSelectionChange();
        }
    },
    getDetailGrid: function() {

        return this.getc().getPanel().down('#' + this.detailGridId);
    }
});


