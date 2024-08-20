Ext.define('Hrd.view.edittunjangan.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.edittunjanganpanel',
    itemId: 'EdittunjanganPanel',
    gridPanelName: 'edittunjangangrid',
    requires: ['Hrd.library.template.view.MoneyField','Hrd.view.edittunjangan.GridEmployee','Hrd.view.edittunjangan.GridKomponen'],
    formSearchPanelName: 'edittunjanganformsearch',
    initComponent: function() {
        var me = this;
        
        

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formEdittunjanganID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    height: '100%',
                    items: [
                        {
                            xtype:'container',
                            layout:'hbox',
                            defaults:{
                                 xtype:'container',
                                 layout:'vbox',
                                 width:470,
                                 margin:'5px 10px 5px 5px',
                                 defaults:{
                                     width:'100%',
                                 }
                            },
                            items:[
                                {
                                   
                                   items:[
                                       {
                                           xtype:'fieldset',
                                           title:'Departemen',
                                           items:[
                                               {
                                                   xtype:'combobox',
                                                   fieldLabel:'',
                                                   displayField:'code',
                                                   name:'department_id',
                                                   valueField:'department_id'
                                               }
                                           ]
                                       },
                                       {
                                           xtype:'fieldset',
                                           
                                           title:'Tabel Karyawan',
                                           items:[
                                               {
                                                   xtype:'edittunjanganemgrid',
                                                   height:270,
                                                   
                                               }
                                           ]
                                       },
                                       
                                   ]
                                },
                                {
                                    items:[
                                        {
                                           xtype:'fieldset',
                                           title:'Periode',
                                           items:[
                                               {
                                                   xtype:'combobox',
                                                   displayField:'text',
                                                   valueField:'number',
                                                   name:'periode'
                                               }
                                           ]
                                       },
                                       {
                                           xtype:'fieldset',
                                           title:'Komponen Gaji',
                                           items:[
                                               {
                                                   xtype:'edittunjangankomgrid',
                                                   height:270,
                                               }
                                           ]
                                       },
                                        
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
                    id: 'toolbarEdittunjanganID',
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
                            hidden:true,
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            hidden:true,
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
                            hidden:true,
                            text: 'Cancel'
                        },
                        {
                            action: 'generate',
                            iconCls: 'icon-new',
                            text: 'Generate Next Period'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});