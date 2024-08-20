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
        //var cbf = new Hrd.template.ComboBoxFields();

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
				readOnly	: true,
                width       : 400,
                action      : 'resetdetail'
            }, {
                xtype       : 'combobox',
                name        : 'pt_id',
                fieldLabel  : 'PT',
                displayField: 'name',
                valueField  : 'pt_id',
				readOnly	: true,
                width       : 400,
                action      : 'resetdetail'
            }, {
                xtype       : 'combobox',
                name        : 'department_id',
                fieldLabel  : 'Department',
                displayField: 'department',
                valueField  : 'department_id',
                width       : 400,
                action      : 'resetdetail'
            }, {
                xtype       : 'numberfield',
                name        : 'year_periode',
                fieldLabel  : 'Periode',
                value       : Ext.Date.format(new Date, 'Y'),
                width       : 200
            }, {
                xtype       : 'container',
                layout      : 'hbox',
                defaults    : {
                    margin      : '0 10px 7px 0'
                },
                items       : [{
                    xtype           : 'datefield',
                    fieldLabel      : 'Periode',
                    name            : 'periode_start',
                    format          : 'd-m-Y',
                    value           : new Date(),
                    submitFormat    : 'Y-m-d H:i:s.u'
                }, {
                    xtype           : 'datefield',
                    name            :'periode_end',
                    value           : new Date(),
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d H:i:s.u'
                }]
            }, {
                xtype       : 'textareafield',
                name        : 'description',
                rows        : '4',
                cols        : '50',
                fieldLabel  : 'Description'
            }, {
                xtype       : 'button',
                text        : 'Generate Perspective',
                action      : 'generate',
                width       : 120
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