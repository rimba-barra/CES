/*  JS CONTROLLER FOR 'Matrix Competency' */

Ext.define('Hrd.controller.Matrixcompetency', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Matrixcompetency',
    stores          : ['Levelcategory'],
    models          : ['Levelcategory'],
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'matrixcompetency',
    fieldName       : 'competencymatrixheader_id',
    bindPrefixName  : 'Matrixcompetency',
    formWidth       : 700,
    localStore      : {},
    refs            : [{
        ref         : 'griddetail',
        selector    : 'matrixcompetencygriddetail'
    }, {
        ref         : 'reportpanel',
        selector    : 'matrixcompetencyreportpanel'
    }],

    constructor     : function(configs) {
        var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init            : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};

        newEvs['matrixcompetencyformdata button[action=generate]'] = {
            click: function() {
                me.generateOnClick();
            }
        };

        newEvs['matrixcompetencyformdata combobox[action=resetdetail]'] = {
            change: function() {
                me.detailReset();
            }
        }

        newEvs['matrixcompetencygriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }

        newEvs['matrixcompetencyreportpanel button[action=print]'] = {
            click: function() {
                me.mainPrint();
            }
        }

        this.control(newEvs);
    },

    detailReset: function() {
        var me      = this;
        var gr      = me.getGriddetail();
        var store   = gr.getStore();

        store.removeAll();
    },

    gridDetailActionColumnClick: function(view, cell, row, col, e) {
        var me      = this;
        var gr      = me.getGriddetail();
        var record  = gr.getStore().getAt(row);
        var m       = e.getTarget().className.match(/\bact-(\w+)\b/);
        gr.getSelectionModel().select(row);

        if (m) {
            switch (m[1]) {
                case 'view':
                    var cnid    = record.data.competency_name_id;
                    var win     = new Ext.Window({
                        modal       : true,
                        closable    : false,
                        left        : 5,
                        top         : 5,
                        id          : 'infowindow',
                        width       : 520,
                        height      : 400,
                        layout      : 'fit',
                        autoScroll  : true,
                        html        : '',
                        bbar        : [{
                            text    : 'Close',
                            iconCls : 'icon-cancel',
                            align   : 'right',
                            handler : function () { this.up('window').close(); }
                        }],
                    });
                    win.show();
                    me.tools.ajax ({
                        params  : {competency_name_id: cnid},
                        success : function(data, model) {
                            if (data.length > 0) {
                                var compname    = data[0].level.competency_name;
                                var compdesc    = data[0].level.competency_name_desc;
                                var table       = '' +
                                '<table width="500" border="0" bgcolor="#fff" cellpadding="10px" cellspacing="5px" >' +
                                '   <tr>' +
                                '       <th style="font-size:24px; padding:5px;" colspan="2">' +
                                '           <strong>' + compname + '</strong>' +
                                '       </th>' +
                                '   </tr>' +
                                '   <tr>' +
                                '       <td style="font-size:11px; height:30px; padding:10px;" colspan="2">' +
                                '           <i>' + compdesc + '</i><br><hr>' +
                                '       </td>' +
                                '   </tr>' +
                                '   <tr>' +
                                '       <td>' +
                                '           <table align="center" width="480" border="1" bgcolor="#E5E4E2" cellpadding="10px" cellspacing="5px">';
                                '               '

                                for (var i = 0; i < data.length; i++) {
                                    var lvlname     = data[i].level.level_category;
                                    var lvldesc     = data[i].level.description;
                                    var sample      = data[i].level.sample_behaviour;
                                    table          += '' +
                                    '<tr style="background: #EDDA74;">' +
                                    '   <td style="font-size:13px; height:10px; padding:5px;"><strong>' + lvlname + '</strong></td>' +
                                    '   <td style="font-size:10px; height:10px; padding:5px;"><i>' + lvldesc + '</i></td>' +
                                    '</tr>' +
                                    '<tr style="background: #FFF380;">' +
                                    '   <td style="font-size:11px; height:20px; padding:7px;" colspan="2"><i>' + sample + '</i></td>' +
                                    '</tr>';
                                };
                                table += '</table></td></tr></table>';
                                Ext.getCmp('infowindow').update(table);
                            } else {
                                Ext.Msg.alert('Info', 'Data not available.');
                                win.close();
                            }
                        }
                    }).read('viewinfo');
                    
                break;

                case 'destroy':
                    record.set('deleted', true);
                    gr.getStore().filterBy(function(recod){
                        return recod.data.deleted==false;
                    });
                break;
            }
        }
    },

    generateOnClick: function() {
        var me      = this;
        var f       = me.getFormdata();
        var vs      = f.getForm().getValues();
        var bnid    = f.down("[name=banding_id]").getValue();
        var jfid    = f.down("[name=jobfamily_id]").getValue();
        
        // added by Wulan Sari 25.04.2018
        var header_id    = f.down("[name=competencymatrixheader_id]").getValue();
        

        if (bnid == null || jfid == null) {
            Ext.Msg.alert('Info', 'Invalid Banding and Job Family');
        } else {
            var gd      = me.getGriddetail();
            gd.doInit();
            
            if(header_id == '' || header_id == undefined){ // added by Wulan Sari 25.04.2018
                
                gd.getStore().load({
                    params  : {
                        jobfamily_id    : jfid,
                        banding_id      : bnid
                    },

                    callback: function(recs,op) {
                        gd.attachModel(op);
                    }
                });
                
            } else {
                
                // added by Wulan Sari 25.04.2018
                gd.getStore().load({
                    params  : {
                        mode_read       : 'listdetailupdate', 
                        jobfamily_id    : jfid,
                        banding_id      : bnid,
                        header_id : header_id
                    },

                    callback: function(recs,op) {
                        gd.attachModel(op);
                    }
                });
                
                
            }            
            
        }
    },

    fdar            : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);
        ;
        
        var x   = {
            init    : function() {},
            create  : function() {
               me.unMask(1);
               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                        var gd  = me.getGriddetail();

                        gd.doInit();
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                    }
                }).read('listcat');
            },
            update  : function() {
                me.unMask(1);

                me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                        Ext.getStore('Levelcategory').load();
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);

                            var headerId    = rec.data.competencymatrixheader_id;
                            var bandingId   = rec.data.banding_id;
                            var jobfamilyId = rec.data.jobfamily_id;
                            var detailGrid  = me.getGriddetail();
                            
                            f.down("[name=competencymatrixheader_id]").setValue(headerId);
                            
                            detailGrid.doInit();
                            detailGrid.getStore().load({
                                params  : {
                                    mode_read                   : 'updatedetail',
                                    competencymatrixheader_id   : headerId
                                },
                                
                                callback: function(recs,op) {
                                    detailGrid.attachModel(op);
                                    for (var i = 0; i < recs.length; i++) {
                                        var raw = recs[i].raw.matrixcompetency.level_category_id;
                                    };
                                }
                            });
                        }
                    }
                }).read('listcat');
            }
        };

        return x;
    },

    mainDataSave    : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        var s   = g.getStore();
        var row = f.editedRow;
        me.getGriddetail().getStore().clearFilter(true);
        me.insSave ({
            form        : f,
            grid        : g,
            finalData   : function(data) {    
                data["details"] = me.getGriddetail().getJson();          
                return data;
            },
            sync        : true,
            callback    : {
                create  : function(store, form, grid) {}
            }
        });
    },
});