Ext.define('Erems.view.templatechecklist.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.templatechecklistformdata',
    requires: ['Erems.template.ComboBoxFields', 'Erems.library.template.component.Typecombobox'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'checklist_bangunan_id'
                },
                {
                    xtype: 'typecombobox',
                    itemId: 'fs_type_id',
                    name: 'type_id',
                    anchor:'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_file_text',
                    name: 'filename'
                },
                {
                    xtype: 'filefield',
                    fieldLabel: 'File',
                    itemId: 'fd_file',
                    name: 'file_browse',
                    flex: 6,
                    anchor: '-5',
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'description',
                    fieldLabel : 'Description',
                    flex       : 6,
                    anchor     : '-5',
                },
                {
                    xtype: 'panel',
                    width: 140,
                    height: 170,
                    bodyStyle: 'background:none',
                    itemId: 'file_image',
                    html: '',
                    flex: 6,
                    anchor: '-5',
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

