Ext.define('Cashier.controller.Masterlog', {
   extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Masterlog',
    refs: [
        {
            ref: 'panel',
            selector: 'masterlogpanel'
        },
        {
            ref: 'grid',
            selector: 'masterloggrid'
        },
        {
            ref: 'formdata',
            selector: 'masterlogformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterlogformsearch'
        },
    ],
    controllerName: 'masterlog',
    fieldName: 'coa',
    bindPrefixName: 'Masterlog',
    formxWinId: 'win-masterlogwinId',
    init: function() {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
        	'masterlogformsearch [name=project_id]': {
                change: function (v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        f.down("[name=pt_pt_id]").setValue('');
                    }
                }
            },
        });   
    },

    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        var grid = me.getGrid();
        p.setLoading("Please wait");
         me.tools.ajax({
            params: {module:me.controllerName},
            form:p,
            success: function(data, model) {   
                try {
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function () {
                        var combostore = f.down('[name=project_id]').getStore();
                            f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });

                    me.tools.weseav2(data.pt, f.down("[name=pt_pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt));
                        if (record) {
                            var storear = grid.getStore();
                            combostore.filter('project_project_id', apps.project, true, false);
                            f.down("[name=pt_pt_id]").setValue(parseInt(apps.pt));
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });

                    me.tools.wesea(data.user, f.down("[name=user_id]")).comboBox();  
                }
                catch(err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init."); 
                }

                p.setLoading(false);  
            }
        }).read('detail');  
    },
});
