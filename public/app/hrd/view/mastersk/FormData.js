Ext.define('Hrd.view.mastersk.FormData', {
    alias: 'widget.masterskformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'mastersk_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'file_name'
                },
                {
                    fieldLabel:'Document Name',
                    width:400,
                    name:'name'
                },
                {
                    fieldLabel:'Number',
                    width:400,
                    name:'nomor'
                },
                {
                    xtype:'dfdatefield',
                    fieldLabel:'From date',
                    name:'tanggal',
                    value: new Date()
                },
                {
                    xtype:'dfdatefield',
                    fieldLabel:'End date',
                    name:'tanggal_habis',
                    value: new Date(9999, 0, 1)
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Category',
                    name: 'masterkategorisk_id',
                    width:400,
                    displayField: 'name',
                    valueField: 'masterkategorisk_id',
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Description',
                    name:'keterangan'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'file_name_show',
                            fieldLabel: 'File Name',
                            readOnly: true,
                            width:400
                        },
                        {
                            xtype: 'filefield',
                            fieldLabel: '',
                            itemId: 'file_name_upload',
                            name: 'file_name_upload',
                            buttonOnly: true,
                            buttonText: 'Browse',
                            width:105
                        }
                    ]
                },
                // {
                //     xtype:'filefield',
                //     itemId:'file_name_upload',
                //     fieldLabel:'File Upload',
                //     name:'file_name_upload'
                // },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Internal',
                    fieldLabel:'&nbsp;',
                    name: 'private',
                    uncheckedValue: '0',
                    inputValue: '1'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Active',
                    fieldLabel:'&nbsp;',
                    name: 'active',
                    uncheckedValue: '0',
                    inputValue: '1',
                    checked: true
                },
                {
                    xtype:'button',
                    fieldLabel:' ',
                    text:'VIEW FILE',
                    action:'lihat_file'
                }
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});