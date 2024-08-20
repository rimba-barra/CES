Ext.define('Hrd.library.box.tools.SimpleGridControlUploadFile', {
    extend: 'Hrd.library.box.tools.SimpleGridControl',
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
                if (cmp.name == "ijasah" || cmp.name == "sertifikat") {
                    cmp.readOnly = true;
                }
                items.push(cmp);
            }

        }

        items.push({
            xtype: 'container',
            items: [
                {
                    xtype: 'button',
                    fieldLabel: ' ',
                    text: 'UPLOAD',
                    action: 'upload_document'
                },
                {
                    xtype: 'button',
                    text: 'Lihat Dokumen',
                    action: 'lihat_dokumen'
                },
            ]
        });

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
});