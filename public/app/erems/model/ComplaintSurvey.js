Ext.define('Erems.model.ComplaintSurvey', {
    extend: 'Ext.data.Model',
    alias: 'model.complaintSurveymodel',
    idProperty: 'survey_aftersales_id',
    fields: [

		{name: 'survey_aftersales_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'periode', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'nilai_survey', type: 'decimal'},
		{name: 'nilai_survey_nps', type: 'decimal'},		
		{name: 'addon', type: 'string'},
		{name: 'addby', type: 'string'},
		{name: 'Modion', type: 'string'},
		{name: 'Modiby', type: 'string'},
		{name: 'deleted', type: 'boolean'},
		{name: 'Deleteon', type: 'string'},
		{name: 'Deleteby', type: 'string'},
    ]
});