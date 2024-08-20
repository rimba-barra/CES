Ext.define('Erems.view.purchaseletterreward.FormSearch', {
        extend: 'Erems.library.template.view.FormSearch',
        alias: 'widget.purchaseletterrewardformsearch',
        requires: [],
        initComponent: function () {
                var me = this;

                Ext.applyIf(me, {
                        defaults: {
                                xtype: 'textfield'
                        },
                        items: [
                                {
                                        fieldLabel: 'Unit Number',
                                        name: 'unit_unit_number',
                                        enableKeyEvents: true
                                }, {
                                        fieldLabel: 'Purchaseletter Number',
                                        name: 'purchaseletter_no',
                                        enableKeyEvents: true
                                }, {
                                        xtype           : 'xnamefieldEST',
                                        fieldLabel      : 'Customer Name',
                                        name            : 'customer_name',
                                        enableKeyEvents : true
                                }, {
                                        fieldLabel: 'VA BCA',
                                        name: 'unit_virtualaccount_bca',
                                        enableKeyEvents: true
                                }, {
                                        fieldLabel: 'VA Mandiri',
                                        name: 'unit_virtualaccount_mandiri',
                                        enableKeyEvents: true
                                }
                                //add by hadi 22082019
                                , {
                                        xtype: 'checkboxfield',
                                        itemId: 'btnCheckDraft',
                                        name: 'is_draft',
                                        fieldLabel: 'SPT Draft',
                                        hidden: true,
                                        checked: false,
                                        inputValue: '1',
                                        uncheckedValue: '0'
                                }
                                //endadd
                        ],
                        dockedItems: me.generateDockedItems()
                });

                me.callParent(arguments);
        }
});