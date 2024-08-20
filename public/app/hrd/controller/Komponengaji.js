Ext.define('Hrd.controller.Komponengaji', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Komponengaji',
    controllerName: 'komponengaji',
    fieldName: 'komponengaji_id',
    formWidth: 600,
    bindPrefixName: 'Komponengaji',
    init: function() {
        var me = this;
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));

        var newEvs = {};

        newEvs['komponengajigrid toolbar button[action=csvimport]'] = {
            click: function() {
                me.showImportWindow();
            }
        };

        newEvs['komponengajiformtoolimport #file_csv'] = {
            change: function(fld, a) {
                me.processUpload(fld, a, 'mode');
            }
        };

        //

        this.control(newEvs);


    },
    
    showImportWindow: function() {
        var me = this;
        var win = me.instantWindow("FormToolImport", 400, "Import CSV", "create", "komponengajicsvwindow");
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();

        if (!g.getSelectedRecord()) {
            motherFunc();
            return;
        }
        f.getForm().loadRecord(g.getSelectedRecord());
        f.down("button[action=save]").setDisabled(false);

        g.up("window").maximize();
        g.setWidth(600);

        motherFunc();

        return false;
    },
    processUpload: function(fld, a, mode) {
        var me = this;


        var me = this;
        var form = fld.up("form");
        var p = me.getPanel();
        me.uploadFile({
            form: form,
            showalert: false,
            params: {'type': 'csv'},
            callback: {
                success: function(fn) {


                    form.setLoading("Proses csv...");
                    me.tools.ajax({
                        params: {
                            file_name:fn
                        },
                        fail: function(msg, data) {

                            form.setLoading(false);
                        },
                        success: function(data) {
                            form.setLoading(false);
                            form.up("window").close();
                            me.tools.alert.info("Success!");
                        }
                    }).process('processcsvfile');
                    
                },
                failure: function() {
                    p.setLoading(false);
                }
            }
        });
    },
});