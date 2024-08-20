Ext.define('Cashier.library.template.view.FdNonLinkCustomerInformation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewfdnonlinkcustomerinformation',
    itemId: 'TemplateViewFdNonLinkCustomerInformation',
    requires:['Cashier.library.template.component.Citycombobox'],
    bodyPadding: 10, 
    title: 'CUSTOMER INFORMATION',
    collapsible: true,
    width: '100%',
    fieldNamePrefix: 'customer_',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'name',
                                                    flex: 1
                                                   }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Address',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'address',
                                                    flex: 1
                                                 }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'citycombobox',
                                                    fieldLabel: 'City',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'city_id',
                                                    itemId:me.fieldNamePrefix+'city_id_cb',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Office phone',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'office_phone',
                                                    flex: 1
                                                  }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Home phone',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'home_phone',
                                                    flex: 1
                                                  }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mobile phone',
                                                    anchor: '-5',
                                                    name: me.fieldNamePrefix+'mobile_phone',
                                                    flex: 1
                                          
                                                }]
                                        }
                                        
                                        



                                    ]
                                }
                            ]
                        }
            ]
        });

        me.callParent(arguments);
    }

});