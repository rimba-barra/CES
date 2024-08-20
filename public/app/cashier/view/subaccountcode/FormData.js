Ext.define('Cashier.view.subaccountcode.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subaccountcodeformdata',   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_subgl_id',
                    name: 'subgl_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    value: '0'
                },
                {
                    xtype: 'projectptallcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fdms_projectptss_id',
                    id: 'fdms_projectptss_id',
                    name: 'projectpt_id',
                    width: 100,
                    emptyText: 'Project Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    forceSelection: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    listeners: {
                    keyup: function (field) {
                        var searchString = field.getRawValue().toString().toLowerCase();
                        if(searchString == null){
                            return false;
                        }
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('ptname') == null || record.get('ptcode') == null || record.get('projectcode') == null) {
                                    return false;
                                }else{
                                    if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('projectcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }    
                                }

                            });
                        }
                    },
                    
                    buffer:300
                }, 
                },
                {
                    xtype: 'subaccountgroupcombobox', //dari alias yang di riquires Cashier.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Kelompok Sub Account',
                    anchor: '-5',
                    allowBlank: false,
                    name: 'kelsub_id', // kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    itemId: 'fd_kelsub_id', //kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    id: 'fd_kelsub_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code1',
                    id: 'fdms_code1',
                    name: 'code1',
                    emptyText: 'Max 30 Digit',
                    fieldLabel: 'Code 1',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 30,
                    anchor: '-5',
                    enableKeyEvents : true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code2',
                    id: 'fdms_code2',
                    emptyText: 'Max 5 Digit',
                    name: 'code2',
                    fieldLabel: 'Code 2',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor: '-5',
                    enableKeyEvents : true
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Cashier.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 3',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code3', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fd_code3', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fd_code3',
                    flex: 1
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Cashier.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 4',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code4', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fd_code4', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fd_code4',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    id: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code sub Account',
                    allowBlank: false,
                    enforceMaxLength: true,
                    emptyText: '[Code 1]<spasi>[Code 2][Code 3][Code 4]',
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    id: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    emptyText: 'Max 500 chars',
                    maxLength: 500,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_notes',
                    id: 'fdms_notes',
                    name: 'notes',
                    fieldLabel: 'Notes',
                    emptyText: 'Max 300 chars',
                    maxLength: 300,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
                {
                    xtype: 'checkbox',
                    name: 'active',
                    inputValue: 1,
                    uncheckedValue: 0,
                    fieldLabel: ' ',
                    boxLabel: 'Active',
                    checked: true
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
});

