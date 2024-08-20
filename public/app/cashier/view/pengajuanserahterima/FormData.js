Ext.define('Cashier.view.pengajuanserahterima.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.pengajuanserahterimaformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'pengajuanserahterima_id',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '97%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                name: 'pengajuanserahterima_id'
            },
            {
                xtype: 'hiddenfield',
                id: 'projectname' + me.uniquename,
                name: 'projectname',
            },
            {
                xtype: 'hiddenfield',
                id: 'project_id' + me.uniquename,
                name: 'project_id',
            },
            {
                xtype: 'hiddenfield',
                id: 'ptname',
                name: 'ptname',
            },        
            {
                xtype: 'ptusercombobox',
                fieldLabel: 'Pt/Company',
                itemId: 'fd_pt_id' + me.uniquename,
                id: 'pt_id',
                name: 'pt_id',
                emptyText: 'Pt / Company',
                readOnly: false,
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null
            },   
            {
                xtype: 'unitnumbercombobox',
                fieldLabel: 'Unit No',
                itemId: 'fd_unit_id' + me.uniquename,
                id: 'unit_id',
                name: 'unit_id',
                emptyText: 'Type Unit No ...',
                readOnly: false,
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                queryMode: 'remote',
                minChars: 1,
                rowdata: null,
                typeAhead: true,
                hideTrigger: true,
                listeners: {
                    keyup: function (field) {
                        var c = 0;
                        var searchString = field.getValue();
                        if(searchString == null){
                            return false;
                        }
                        if (searchString.length > 0) {

                            this.store.filterBy(function (record, id) {
                                if (record.get('unit_number').toLowerCase().indexOf(field.getValue()) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }

                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Rencana ST',
                itemId: 'fd_rencana_serahterima_date' + me.uniquename,
                id: 'rencana_serahterima_date' + me.uniquename,
                name: 'rencana_serahterima_date',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                emptyText: 'Autocomplete',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                readOnly: true
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Pengajuan ST',
                itemId: 'fd_rencana_serahterima_aju_date' + me.uniquename,
                id: 'rencana_serahterima_aju_date' + me.uniquename,
                name: 'rencana_serahterima_aju_date',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                emptyText: 'Manual Input',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null
            },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75, iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function () {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },
});

