Ext.define('Hrd.view.editgaji.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.editgajipanel',
    itemId: 'EditgajiPanel',
    gridPanelName: 'editgajigrid',
    requires:['Hrd.view.editgaji.Grid','Hrd.library.template.view.MoneyField'],
    formSearchPanelName: 'editgajiformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formEditgajiID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    
                    items: [
                        { 
                           xtype:'hiddenfield',
                           name:'employee_employee_id'
                        },
                        {
                          xtype:'container',
                          layout:'hbox',
                          items:[
                              {
                                  xtype:'editgajigrid',
                                  height:400,
                                  width:600,
                                  autoScroll:true,
                                  
                              },
                              {
                                  xtype:'container',
                                  layout:'vbox',
                                  width:300,
                                  margin:'5px 5px 5px 20px',
                                  items:[
                                      {
                                          xtype:'textfield',
                                          fieldLabel:'NIK',
                                          keepRO:true,
                                          name:'employee_employee_nik'
                                      },
                                      {
                                          xtype:'textfield',
                                          fieldLabel:'Nama',
                                          keepRO:true,
                                          name:'employee_employee_name'
                                      },
                                      {
                                          xtype:'xmoneyfield',
                                          fieldLabel:'Gaji Pokok',
                                          name:'gaji'
                                      },
                                      {
                                          xtype:'xmoneyfield',
                                          fieldLabel:'Gaji Pokok Baru',
                                          name:'gaji_baru'
                                      },
                                      {
                                          xtype:'dfdatefield',
                                          fieldLabel:'Periode',
                                          name:'periode',
                                          
                                      }
                                  ]
                              }
                          ]
                        }
                    ]
                }


            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarEditgajiID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        },
                        {
                            action: 'proses',
                            iconCls: 'icon-new',
                            text: 'Proses'
                        },
                        {
                            action: 'import',
                            iconCls: 'icon-new',
                            text: 'Import'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});