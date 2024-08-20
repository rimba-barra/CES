Ext.define('Hrd.view.matrixcompetency.FormData', {
    alias           : 'widget.matrixcompetencyformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : ['Hrd.view.matrixcompetency.GridDetail'],
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
                name        : 'matrixcompetency_id',
            }, 
            
            // added by Wulan Sari 25.04.2018
            {
                xtype       : 'hiddenfield',
                name        : 'competencymatrixheader_id',
            }, 
            
                
            {
                xtype       : 'combobox',
                name        : 'banding_id',
                fieldLabel  : 'Banding',
                displayField: 'banding',
                valueField  : 'banding_id',
                width       : 400,
                action      : 'resetdetail'
            }, {
                xtype       : 'container',
                layout      : 'hbox',
                items       : [{
                    xtype       : 'combobox',
                    name        : 'jobfamily_id',
                    fieldLabel  : 'Job Family',
                    displayField: 'jobfamily',
                    valueField  : 'jobfamily_id',
                    width       : 400,
                    action      : 'resetdetail'
                }, {
                    xtype       : 'tbspacer',
                    width       : 30
                }, {
                    xtype       : 'button',
                    text        : 'Generate',
                    action      : 'generate',
                    width       : 200
                }]
            }, {
                xtype       : 'matrixcompetencygriddetail',
                height      : 300,
                style       : 'padding: 10 0 10 0'
            }],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});