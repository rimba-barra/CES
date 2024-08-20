Ext.define('Gl.view.setlapneraca.FormSearch',{
    extend:'Gl.library.template.view.FormSearch',
    alias:'widget.setlapneracaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },  
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    value: parseInt(apps.project)
                },  
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    value: parseInt(apps.pt)
                },         
                {
                    xtype: 'projectptcomboboxv2',
                    fieldLabel: 'Project / PT',
                    name: 'projectpt_id',
                    displayField: 'ptname',
                    valueField: 'projectpt_id',
                    enforceMaxLength: true,
                    allowBlank: false,
                    value: parseInt(apps.projectpt)
                },  
                {
                    xtype: 'textfield',
                    itemId: 'fsms_report_level',
                    name: 'report_level',
                    fieldLabel: 'Template Level',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                }
             
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
