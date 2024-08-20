Ext.define('Cashier.view.subaccountcode.FormSearch',{
    extend: 'Cashier.library.template.view.FormSearch',
    alias : 'widget.subaccountcodeformsearch',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
            {
                xtype: 'hiddenfield',
                name : 'hideparam',
                value: 'default'
            },
            {
                xtype: 'hiddenfield',
                name : 'pt_id',
                value: '0'
            },
            {
                xtype           : 'projectptallcombobox',
                fieldLabel      : 'Pt/Company',
                itemId          : 'fs_projectpt_id',
                id              : 'projectpt_id_s',
                name            : 'projectpt_id',
                width           : 100,
                emptyText       : 'Project Company',
                allowBlank      : false,
                enforceMaxLength: true,
                enableKeyEvents : true,
                rowdata         : null,
                listeners       : {
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
                    
                    buffer: 300
                }, 
            },
            {
                    xtype     : 'subaccountgroupcombobox',   //dari alias yang di riquires Gl.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Kelompok Sub Account',
                    anchor    : '-5',
                    allowBlank: true,
                    name      : 'kelsub_id',                 // kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    itemId    : 'fsms_kelsub_id',            //kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    id        : 'fsms_kelsub_id',
                    flex      : 1
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fsms_code1',
                    name            : 'code1',
                    fieldLabel      : 'Code 1',
                    enforceMaxLength: true,
                    maxLength       : 50,
                    enableKeyEvents : true
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fsms_code2',
                    name            : 'code2',
                    fieldLabel      : 'Code 2',
                    enforceMaxLength: true,
                    maxLength       : 50,
                    enableKeyEvents : true
                },
                {
                    xtype     : 'subdesccodecombobox',   //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 3',
                    anchor    : '-5',
                    allowBlank: true,
                    name      : 'code3',                 // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId    : 'fsms_code3',            //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id        : 'fsms_code3',
                    flex      : 1
                },
                {
                    xtype     : 'subdesccodecombobox',   //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 4',
                    anchor    : '-5',
                    allowBlank: true,
                    name      : 'code4',                 // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId    : 'fsms_code4',            //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id        : 'fsms_code4',
                    flex      : 1
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fsms_code',
                    id              : 'fsms_code',
                    name            : 'code',
                    fieldLabel      : 'Code sub Account',
                    allowBlank      : true,
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    anchor          : '-5',
                    enableKeyEvents : true
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fsms_description',
                    id              : 'fsms_description',
                    name            : 'description',
                    fieldLabel      : 'Sub Description',
                    allowBlank      : true,
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 50,
                    anchor          : '-5'
                },
                {
                    xtype         : 'combobox',
                    name          : 'unit_status',
                    fieldLabel    : 'Status Unit',
                    queryMode     : 'local',
                    valueField    : 'unit_status',
                    editable      : false,
                    value         : 'ALL',
                    forceSelection: true,
                    displayField  : 'txt',
                    store         : new Ext.data.JsonStore({
                        fields: ['unit_status', 'txt'],
                        data  : [
                            {unit_status: 'ALL', txt: 'ALL'},
                            {unit_status: '0', txt: 'ACTIVE'},
                            {unit_status: '1', txt: 'DELETED'}
                        ]
                    }),
                    autoSelect: true,
                    listeners : {
                        afterrender: function() {
                        this.setValue(this.value);    
                        }
                    }
                },
                ],
                dockedItems: me.generateDockedItems()
            });

    me.callParent(arguments);
}
});
