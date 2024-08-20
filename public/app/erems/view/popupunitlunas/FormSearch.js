Ext.define('Erems.view.popupunitlunas.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupunitlunasformsearch',
    initComponent : function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                // {
                //     xtype     : 'panel',
                //     height    : 48,
                //     bodyStyle : 'background:none;border:0;',
                //     anchor    : '-15',
                //     layout    : {type: 'column'},
                //     items     : [
                //         {
                //             xtype          : 'xdatefield',
                //             itemId         : 'purchase_startdate',
                //             name           : 'purchase_startdate',
                //             fieldLabel     : 'Purchase date',
                //             labelSeparator : '',
                //             width          : 100,
                //             labelAlign     : 'top',
                //             editable       : false,
                //         },
                //         {
                //             xtype            : 'label',
                //             margin           : '23px 5px 0 5px',
                //             styleHtmlContent : false,
                //             width            : 10,
                //             text             : 'to'
                //         },
                //         {
                //             xtype          : 'xdatefield',
                //             itemId         : 'purchase_enddate',
                //             name           : 'purchase_enddate',
                //             fieldLabel     : '&nbsp;',
                //             labelSeparator : '',
                //             width          : 100,
                //             labelAlign     : 'top',
                //             editable       : false,
                //         },
                //     ]
                // },
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_purchaseletter_no',
                    name       : 'purchaseletter_no',
                    fieldLabel : 'Purchaseletter Number'
                },
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_unit_number',
                    name       : 'unit_number',
                    fieldLabel : 'Unit Number'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});