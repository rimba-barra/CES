Ext.define('Erems.controller.Resyncvabca', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Resyncvabca',
    requires: [
        'Erems.library.box.tools.Tools',
        'Erems.library.template.component.Resynccombobox',
    ],
    stores:['Resync'],
    models:['Resync'],
    views: ['resyncvabca.Panel', 'resyncvabca.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'resyncvabcapanel'
        },
        {
            ref: 'formdata',
            selector: 'resyncvabcaformdata'
        }

    ],
    controllerName: 'resyncvabca',
    // formWidth: 750,
    fieldName: 'name',
    bindPrefixName: 'Resyncvabca',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'resyncvabcapanel': {
                afterrender: this.panelAfterRender
            },
            'resyncvabcaformdata button[action=download]': {
                click: this.printExcel
            },
            // added by rico 14022023
            'resyncvabcaformdata [name=nomor_va]': {
                blur: this.getResyncData
            },
            // added by rico 14022023
            'resyncvabcaformdata [name=payment_date]': {
                select: this.getResyncData
            },
            // added by rico 14022023
            'resyncvabcaformdata [name=resync_id]': {
                select: this.selectResyncData
            },
            // added by rico 14022023
            'resyncvabcaformdata button[action=sync]': {
                click: this.syncAction
            },
        });
    },
    getResyncData: function(){
        var me = this;
        var form = me.getFormdata();
        var nomor_va = form.down("[name=nomor_va]");
        var payment_date = form.down("[name=payment_date]");

        if(nomor_va.getValue() && payment_date.getValue()){
            Ext.Ajax.request({
                url: 'erems/resyncvabca/read/?action=schema',
                params: {
                    mode_read: 'detail',
                    nomor_va: nomor_va.getValue(),
                    payment_date: payment_date.getValue()
                },
                success: function(response) {
                    var data = Ext.decode(response.responseText).data;
                    data.sort();

                    form.down("[name=resync_id]").getStore().removeAll();
                    form.down("[name=resync_id]").getStore().add(data);
                }
            });
        }
    },
    selectResyncData: function(){
        var me = this;
        var form = me.getFormdata();
        var resync_id = form.down("[name=resync_id]");

        Ext.Ajax.request({
            url: 'erems/resyncvabca/read/?action=schema',
            params: {
                mode_read: 'resync',
                resync_id: resync_id.getValue()
            },
            success: function(response) {
                var data = Ext.decode(response.responseText).data;

                form.down("[name=api_vabca_logs_id]").setValue(data[0].api_vabca_logs_id);
                form.down("[name=params]").setValue(data[0].params);
            }
        });
    },
	syncAction: function() {
		var me = this;
		var form = me.getFormdata().getForm();
		var formVal = form.getValues();

		var msg = '';

		if (form.isValid()) {
            console.log("FORM");
            console.log(form);
			console.log(formVal);
		}
	},
});