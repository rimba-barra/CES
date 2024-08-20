Ext.define('Hrd.view.reloadpm.FormData', {
    alias: 'widget.reloadpmformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.reloadpm.GridDetail'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
        //var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [{
                    xtype: 'hiddenfield',
                    name: 'employee_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'department_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                }, {
                    xtype: 'textfield',
                    name: 'employee_nik',
                    fieldLabel: 'NIK',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'department',
                    fieldLabel: 'Department',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'project_name',
                    fieldLabel: 'Project',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'pt_name',
                    fieldLabel: 'PT',
                    readOnly: true,
                    width: 350
                },{
                    xtype: 'textfield',
                    name: 'package_name',
                    fieldLabel: 'Package Document',
                    readOnly: true,
                    width: 350
                },
                {
                    xtype: 'reloadpmgriddetail',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }],

            dockedItems: me.generateDockedItem()
        });
        
        

        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                    {xtype:'tbfill'},
                    {
                        xtype: 'button',
                        action: 'close',
                        itemId: 'btnClose',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',                       
                    }, 
					
                ]
            }
        ];
        return x;
    },
});