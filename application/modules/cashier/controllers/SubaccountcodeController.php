<?php

class Cashier_SubaccountcodeController extends Zend_Controller_Action {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }  

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model  = new Cashier_Models_Subaccountcode();
       
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        
        $post_data['page']  = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
          //david 2020-09-29 Jika Limit 0 maka 25 saja
        if($post_data['limit']==0){
            $post_data['limit'] = 25;
        }

        if ($post_data['hideparam'] =='filterbysub' || $post_data['hideparam'] =='filterSubbyCode1') {
            $post_data['checkallsub'] = $this->getRequest()->getPost('checkallsub');
            $post_data['type']        = $this->getRequest()->getPost('type');
            $post_data['customCode']  = $this->getRequest()->getPost('customCode');
            $post_data['customCode1'] = $this->getRequest()->getPost('customCode1');
            $post_data['customCode2'] = $this->getRequest()->getPost('customCode2');
        }
        
        $post_data['subgl_id']     = $this->getRequest()->getPost('subgl_id');
        $post_data['kelsub_id']    = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsubid_in']  = $this->getRequest()->getPost('kelsubid_in');
        $post_data['coaid_in']     = $this->getRequest()->getPost('coaid_in');
        $post_data['fromkelsub']   = $this->getRequest()->getPost('fromkelsub');
        $post_data['untilkelsub']  = $this->getRequest()->getPost('untilkelsub');
        $post_data['fromcoa']      = $this->getRequest()->getPost('fromcoa');
        $post_data['untilcoa']     = $this->getRequest()->getPost('untilcoa');
        $post_data['accountgroup'] = $this->getRequest()->getPost('accountgroup');
        $post_data['code']         = $this->getRequest()->getPost('code');
        $post_data['code1']        = $this->getRequest()->getPost('code1');
        $post_data['code2']        = $this->getRequest()->getPost('code2');
        $post_data['code3']        = $this->getRequest()->getPost('code3');
        $post_data['subdsk3']      = $this->getRequest()->getPost('subdsk3');
        $post_data['code4']        = $this->getRequest()->getPost('code4');
        $post_data['subdsk4']      = $this->getRequest()->getPost('subdsk4');
        $post_data['description']  = $this->getRequest()->getPost('description');
        $post_data['from']         = $this->getRequest()->getPost('from');
        $post_data['until']        = $this->getRequest()->getPost('until');
        $post_data['coa_source']   = $this->getRequest()->getPost('coa_source');
        $post_data['pt_id_owner']  = $this->getRequest()->getPost('pt_id_owner');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $post_data['project_id']   = $this->getRequest()->getPost('project_id');
        $post_data['pt_id']        = $this->getRequest()->getPost('pt_id');
        $post_data['notes']        = $this->getRequest()->getPost('notes');
        $post_data['unit_status']  = $this->getRequest()->getPost('unit_status');
        
        $result = $model->subaccountcodeRead($post_data);

          // Seftian 02 Juli 2021
          /*for ( $i = 0 ; $i < sizeof($result['data']); $i++) { 
            $check                            = $model->check_unit_erems($result['data'][$i]['subgl_id']);
            $result['data'][$i]['unit_erems'] = $check;
        }*/

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        //Rizal 31 Mei 2019
        //        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        //
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        //Rizal 31 Mei 2019
        //        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        //
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        //Rizal 31 Mei 2019
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        //
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodeDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function checkexistAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        //Rizal 31 Mei 2019
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        //
        $model = new Gl_Models_Subaccountcode();
        $result = $model->subaccountcodecheckexist($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function importAction(){
        $result    = array('data' => array(), 'total' => 0, 'message' => NULL, 'success' => true);
        $tmpName               = $_FILES['file-path']['tmp_name'];
        $arrData               = array();
        $arrDataValidate       = array();
        $arrDataValidateSubdsk = array();
        
        $csvAsArray      = fopen($tmpName, "r");
        $i               = 1;
        
        while (($line = fgets($csvAsArray)) !== FALSE) {
            $line = str_replace("\t",";",$line);
            $line = str_replace("\r\n","",$line);
            $line = str_replace("\r","",$line);
            $line = str_replace("\n","",$line);
            $line = str_replace("\"","",$line);
            $line = str_replace("'","`",$line);
            $arr  = explode(';',$line);

            if (count($arr) <> 8) {
                $result    = array('data' => array(), 'total' => 0, 'message' => 'Kolom CSV Tidak sesuai', 'success' => false);
                goto last;
            }

            if ($i > 1 ) {                
                array_push($arrDataValidate, $arr[1] . '~' . $arr[2]);
                array_push($arrDataValidateSubdsk, $arr[5] . '~' . $arr[6]);
                array_push($arrData, $arr);
            }
            $i++;
        }
        
        fclose($csvAsArray);
        $model       = new Gl_Models_Subaccountcode();
        $cekValidate = $model->validateUpload($arrDataValidate,$arrDataValidateSubdsk);

        if ($cekValidate['error'] > 0 ) {
            $result    = array(
                'data'    => array(),
                'total'   => 0,
                'message' => $cekValidate['message'],
                'success' => false
            );
        }
        
        if ($cekValidate['error'] == 0 ) {
            for ($i=0; $i < count($arrData) ; $i++) {
                $param     = $arrData[$i];

                $item = array(
                    'kelsub'      => $param[1],
                    'code'        => $param[2],
                    'code1'       => $param[3],
                    'code2'       => $param[4],
                    'code3'       => $param[5],
                    'code4'       => $param[6],
                    'description' => $param[7]
                );
                $model       = new Gl_Models_Subaccountcode();
                $result = $model->importSub($item);
            }

            $result    = array('data' => array(), 'total' => 0, 'message' => NULL, 'success' => true);
        }

        last:
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>