Ext.define('Hrd.controller.Competency', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Competency',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.XyReport'
    ],
    controllerName  : 'competency',
    fieldName       : 'competency_id',
    bindPrefixName  : 'Competency',
    formWidth       : 500,
    localStore      : {},

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
        
        newEvs['competencygrid button[action=printx]'] = {
            click: function(el){
                me.mainPrint();
            }
        };

        this.control(newEvs);
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
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencycategory, f.down("[name=competency_category_id]")).comboBox();
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                    }
                }).read('listcat');
            },
            update  : function() {
               me.unMask(1);

               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencycategory, f.down("[name=competency_category_id]")).comboBox();
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();

                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
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

        me.insSave ({
            form        : f,
            grid        : g,
            finalData   : function(data) {                
                return data;
            },
            sync        : true,
            callback    : {
                create  : function(store, form, grid) {}
            }
        });
    },

    /*@implement this method for xyReport Class*/
    xyReportProcessParams: function(reportData) {
        var me      = this;
        var groupBy = reportData.params["Groupby"];
        var fn      = "HouseOfCompetency";
        var plId    = 0;
        /// added
        var g       = me.getGrid();
        var rec     = g.getSelectedRecord();

        // if (rec) {
        //     plId = rec.get("purchaseletter_id");
        // } else {

        // }
        // console.log(plId);
        // end added
        // reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
        reportData['file'] = fn;
        // reportData.params["purchaseletter_id"] = plId;
        return reportData;
    },

    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Hrd.library.XyReport();
            me.xyReport.init(me);
        }
        me.xyReport.processReport();
    },
});