<?php

class Erems_BiayalegalitasController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_biayalegalitas = new Erems_Models_Biayalegalitas();
        
        $post_data['mode_read']      = $this->getRequest()->getPost('mode_read');
        $post_data['read_type_mode'] = $this->getRequest()->getPost('read_type_mode');
        
        if($this->getRequest()->getPost('mode_read') == 'detailGenco'){
            return $this->gencoRead();
            exit;
        }
        
       if($post_data['mode_read'] == 'griddetailspr'){
            $post_data['berkas_surat_id'] = $this->getRequest()->getPost('berkas_surat_id');
            $post_data['start']           = $this->getRequest()->getPost('start');
            $post_data['limit']           = $this->getRequest()->getPost('limit');
            $post_data['page']            = $this->getRequest()->getPost('page');
        
            $result = $model_biayalegalitas->griddetailsprRead($post_data);
        } 
        else if ($post_data['mode_read'] == 'pl_bl') {
            $post_data['start']         = $this->getRequest()->getPost('start');
            $post_data['limit']         = $this->getRequest()->getPost('limit');
            $post_data['page']          = $this->getRequest()->getPost('page');
            $post_data['unit_id']       = $this->getRequest()->getPost('unit_id');
            $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
            $post_data['cluster_id']    = $this->getRequest()->getPost('cluster_id');

            $result = $model_biayalegalitas->purchaseletterblRead($post_data);
        }
        else if ($post_data['mode_read'] == 'detail_biayalegalitas') {
            $post_data['biayalegalitas_id'] = $this->getRequest()->getPost('biayalegalitas_id');

            $result = $model_biayalegalitas->detailBiayalegalitasRead($post_data);
        }
        else if($post_data['mode_read'] == 'config'){
            $vabca_biaya_legalitas     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NovabcaBiayalegalitas();
            $vamandiri_biaya_legalitas = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NovamandiriBiayalegalitas();
            $round                     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->pembulatanSchedulebiayalegalitas();

            $result = array(
                'vabca_active'                => $vabca_biaya_legalitas['active'],
                'vabca_digit_payment'         => $vabca_biaya_legalitas['digit_payment'],
                'vabca_start_index_digit'     => $vabca_biaya_legalitas['start_index_digit'],
                'vamandiri_active'            => $vamandiri_biaya_legalitas['active'],
                'vamandiri_digit_payment'     => $vamandiri_biaya_legalitas['digit_payment'],
                'vamandiri_start_index_digit' => $vamandiri_biaya_legalitas['start_index_digit'],
                'round'                       => $round,
                'prolibfile'                  => $this->prolibfile($this->session->getCurrentProjectId(), $this->session->getCurrentPtId()),
                "typeCalculaterounding"       => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->typeCalculaterounding(),
            );
        }
        else {
            $post_data['start']           = $this->getRequest()->getPost('start');
            $post_data['limit']           = $this->getRequest()->getPost('limit');
            $post_data['unit_number']     = $this->getRequest()->getPost('unit_number');
            $post_data['cluster_id']      = $this->getRequest()->getPost('cluster_id');
            $post_data['block_id']        = $this->getRequest()->getPost('block_id');
            $post_data['customer_name']   = $this->getRequest()->getPost('customer_name');
            $post_data['berkas_group']    = $this->getRequest()->getPost('berkas_group_menu');
            $post_data['page']            = $this->getRequest()->getPost('page');
            $post_data['virtual_account'] = $this->getRequest()->getPost('virtual_account');

            
            $result = $model_biayalegalitas->biayalegalitasRead($post_data);
        }
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model_biayalegalitas = new Erems_Models_Biayalegalitas();

//      var_dump('wew');
        $result = $model_biayalegalitas->biayalegalitasCreate($post_data);
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

//        var_dump($post_data);die();
        $model_biayalegalitas = new Erems_Models_Biayalegalitas();
        // $result = $model_biayalegalitas->biayalegalitasUpdate($post_data);
        $result = $model_biayalegalitas->biayalegalitasUpdateWithNewRule($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
//        var_dump($post_data);        die();
        $model_biayalegalitas = new Erems_Models_Biayalegalitas();
        $result = $model_biayalegalitas->biayalegalitasDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    function printoutAction(){
        $model = new Erems_Models_Biayalegalitas();

        $post_data['biayalegalitas_id'] = $this->getRequest()->getPost('id');
        $document_name                  = $this->getRequest()->getPost('document_name');

        $rs = $model->printoutRead($post_data);
        $resultdata = $rs['data'][0];
                
        $result['success'] = false;

        $data = array();
        if(count($resultdata) > 0){
            foreach($resultdata as $field => $value){
                $data[$field] = $value;
            }

            $fileSrc   = 'biayalegalitasprintout/' . $document_name;
            $finalFile = 'BIAYALEGALITAS_'.time().'.docx';

            $p  = new Erems_Box_Library_MyWordParser();
            $ok = $p->printDoc($fileSrc, $finalFile, $data);

            if($ok){
                $result['success'] = true;
                $result['url'] = $p->getUrl();
            } 
        } 

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function printsprout($sprindex,$berkas_spr_id){
        $model = new Erems_Models_Biayalegalitas();

        $post_data['berkas_spr_id'] = $berkas_spr_id;
        $document_name = $this->getRequest()->getPost('document_name');
        
        if ($sprindex == 1) {
            $document_name_fn =  str_replace('SPR','SPR1',$document_name);
            $rs = $model->printspr1outRead($post_data);
        } else if ($sprindex == 2) {
            $document_name_fn =  str_replace('SPR','SPR2',$document_name);
            $rs = $model->printspr2outRead($post_data);
        } else if ($sprindex == 3) {
            $document_name_fn =  str_replace('SPR','SPR3',$document_name);
            $rs = $model->printspr3outRead($post_data);
        } else if ($sprindex == 4) {
            $document_name_fn =  str_replace('SPR_BERKAS','SURAT_PEMBATALAN_SEPIHAK',$document_name);
            $rs = $model->printspr4outRead($post_data);
        }
        
        
        
        
//        var_dump($rs);die();
        $resultdata = $rs['data'][0];
                
        $result['success'] = false;

        $data = array();
        if(count($resultdata) > 0){
                foreach($resultdata as $field => $value){
                        $data[$field] = $value;
                }
//                var_dump($data);die();
//                $lineBreak = '<w:br/>';
                if ($sprindex == 2){
                    $data["spr_next_date1"] = date_format(date_create($data["spr_next_date1"]),"d F Y");
                    $data["n"] = str_replace('\n ', '         ', $data["rownum"]);
                    $data["berkas_list"] = str_replace('\n ', '                             ', $data["berkas_list"]);
                    $data["date_now"] = date_format(date_create($data["date_now"]),"d F Y");
                    $data["spr_next_date"] = date_format(date_create($data["spr_next_date"]),"d F Y");
                } else if($sprindex == 3){
                    $data["spr_next_date2"] = date_format(date_create($data["spr_next_date2"]),"d F Y");
                    $data["n"] = str_replace('\n ', '         ', $data["rownum"]);
                    $data["berkas_list"] = str_replace('\n ', '                             ', $data["berkas_list"]);
                    $data["date_now"] = date_format(date_create($data["date_now"]),"d F Y");
                    $data["spr_next_date"] = date_format(date_create($data["spr_next_date"]),"d F Y");
                } else if ($sprindex == 4) {
//                    var_dump($data["total"]);die();
                    $data["date_now"] = date_format(date_create($data["date_now"]),"d F Y");
                    $data["spr_next_date"] = date_format(date_create($data["spr_next_date"]),"d F Y");
                    $data["spr_next_date1"] = date_format(date_create($data["spr_next_date1"]),"d F Y");
                    $data["spr_next_date2"] = date_format(date_create($data["spr_next_date2"]),"d F Y");
                    $data["spr_next_date3"] = date_format(date_create($data["spr_next_date3"]),"d F Y");
//                    $data["tanda_jadi_terbilang"] = $this->terbilang($data["tanda_jadi"]);
//                    $data["total_terbilang"] = $this->terbilang($data["total"]);
                    $data["tanda_jadi"] = number_format($data["tanda_jadi"]);
                    $data["total"] = number_format($data["total"]);
                } else {
//                    var_dump('woy juga');
                    $data["n"] = str_replace('\n ', '         ', $data["rownum"]);
                    $data["berkas_list"] = str_replace('\n ', '                             ', $data["berkas_list"]);
                    $data["date_now"] = date_format(date_create($data["date_now"]),"d F Y");
                    $data["spr_next_date"] = date_format(date_create($data["spr_next_date"]),"d F Y");
                }
                
                
                $p = new Erems_Box_Library_MyWordParser();
                $wpdf = new Erems_Box_Library_WordToPdf();
                $fileSrc = 'berkasprintout/'.$document_name_fn;
                
                if ($sprindex == 4){
                    $finalFile = 'SURAT_PEMBATALAN_SEPIHAK_'.time().'.docx';
                } else {
                    $finalFile = 'SPR_BERKAS_'.time().'.docx';
                }
//                $finalFile = 'SPR_BERKAS_'.time().'.docx';
                $ok = $p->printDoc($fileSrc, $finalFile, $data);

                $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

                if($generalConfig->getFormatFileSPT()=="pdf"){
            $wpdf->convert($p->getUrl());
            $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
        }else{
            $pathUrl = $p->getUrl();
        }

                if($ok){
                        $result['success'] = true;
                        $result['url'] = $pathUrl;
                } else {
                        $result['success'] = false;
                }

        } else {
                $result['success'] = false;
        }
        return $result;
    }
    
    function penyebut($nilai) {
            $nilai = abs($nilai);
            $huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
            $temp = "";
            if ($nilai < 12) {
                    $temp = " ". $huruf[$nilai];
            } else if ($nilai <20) {
                    $temp = $this->penyebut($nilai - 10). " belas";
            } else if ($nilai < 100) {
                    $temp = $this->penyebut($nilai/10)." puluh". $this->penyebut($nilai % 10);
            } else if ($nilai < 200) {
                    $temp = " seratus" . $this->penyebut($nilai - 100);
            } else if ($nilai < 1000) {
                    $temp = $this->penyebut($nilai/100) . " ratus" . $this->penyebut($nilai % 100);
            } else if ($nilai < 2000) {
                    $temp = " seribu" . penyebut($nilai - 1000);
            } else if ($nilai < 1000000) {
                    $temp = $this->penyebut($nilai/1000) . " ribu" . $this->penyebut($nilai % 1000);
            } else if ($nilai < 1000000000) {
                    $temp = $this->penyebut($nilai/1000000) . " juta" . $this->penyebut($nilai % 1000000);
            } else if ($nilai < 1000000000000) {
                    $temp = $this->penyebut($nilai/1000000000) . " milyar" . $this->penyebut(fmod($nilai,1000000000));
            } else if ($nilai < 1000000000000000) {
                    $temp = $this->penyebut($nilai/1000000000000) . " trilyun" . $this->penyebut(fmod($nilai,1000000000000));
            }     
            return $temp;
    }

    function terbilang($nilai) {
            if($nilai<0) {
                    $hasil = "minus ". trim($this->penyebut($nilai));
            } else {
                    $hasil = trim($this->penyebut($nilai));
            }           
            return $hasil;
    }

    private function prolibfile($projectid, $ptid){
        // cek semua fungsi yang digunakan keperluan masing Project 
        $dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
        $prolibsFiles      = scandir($dir);
        $prolibsFound      = NULL;
        $className         = "Prolibs_" . $projectid . "_" . $ptid;
        $prolibsFileSearch = $className . ".js";

        if (count($prolibsFiles) > 0) {
            $prolibsFiles = preg_grep("/.js$/", $prolibsFiles);

            if (in_array($prolibsFileSearch, $prolibsFiles)) {
                $prolibsFound = $className;
            }
        }

        return $prolibsFound;
    }

}

?>