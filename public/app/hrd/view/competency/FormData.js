Ext.define('Hrd.view.competency.FormData', {
    alias           : 'widget.competencyformdata',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
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
                name        : 'competency_id',
            }, {
                xtype       : 'combobox',
                name        : 'competency_category_id',
                fieldLabel  : 'Competency Category',
                displayField: 'competency_category',
                valueField  : 'competency_category_id',
                listeners   : {
                    select  : function(combo) {
                        if (combo.getRawValue()=='Job Family Competency') {
                            // Ext.getCmp('jobfamily_id').setDisabled(false);
                            me.down('[name=jobfamily_id]').setDisabled(false);
                        } else {
                            me.down('[name=jobfamily_id]').setDisabled(true);
                        }
                    }
                }
            }, {
                xtype       : 'combobox',
                name        : 'jobfamily_id',
                fieldLabel  : 'Job Family',
                displayField: 'jobfamily',
                valueField  : 'jobfamily_id',
                disabled    : true
            }, {
                xtype       : 'combobox',
                name        : 'competency_name_id',
                fieldLabel  : 'Competency Name',
                displayField: 'competency_name',
                valueField  : 'competency_name_id'
            }, {

                xtype       : 'textfield',
                name        : 'code',
                fieldLabel  : 'Code'
            }, {
                xtype       : 'textareafield',
                name        : 'description',
                rows        : '10',
                cols        : '25',
                fieldLabel  : 'Description'
            }],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});