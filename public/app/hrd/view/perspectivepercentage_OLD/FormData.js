Ext.define('Hrd.view.perspectivepercentage.FormData', {
    alias           : 'widget.perspectivepercentageformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : ['Hrd.view.perspectivepercentage.GridDetail'],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    initComponent   :  function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'perspective_percentage_id',
            }, {
                xtype       : 'combobox',
                name        : 'project_id',
                fieldLabel  : 'Project',
                displayField: 'name',
                valueField  : 'project_id',
                width       : 400,
                // action      : 'resetdetail'
            }, {
                xtype       : 'combobox',
                name        : 'pt_id',
                fieldLabel  : 'PT',
                displayField: 'name',
                valueField  : 'pt_id',
                width       : 400,
                action      : 'resetdetail'
            }, {
                xtype       : 'container',
                layout      : 'hbox',
                items       : [{
                    xtype       : 'combobox',
                    name        : 'department_id',
                    fieldLabel  : 'Department',
                    displayField: 'department',
                    valueField  : 'department_id',
                    width       : 400,
                    action      : 'resetdetail'
                }, {
                    xtype       : 'tbspacer',
                    width       : 30    
                }, {
                    xtype       : 'button',
                    text        : 'Add Perspective',
                    action      : 'addperspective',
                    width       : 120
                }]
            }, {
                xtype       : 'perspectivepercentagegriddetail',
                height      : 300,
                style       : 'padding: 10 0 10 0'
            }],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});