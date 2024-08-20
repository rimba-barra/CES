<?php
class Erems_BypassController extends Zend_Controller_Action {
    private $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function statusAction(){
        $check = end(explode('/', $_SERVER['REQUEST_URI']));
        $queryString = explode('&',base64_decode($check));

        $param = array();
        foreach ($queryString as $key => $value) {
            list($k,$v) = explode('=',$value);
            $param[$k] = $v;
        }

        if($param['mode_read'] == 'approve_purchaseletter_flashprint'){
            $this->approvePurchaseletterFlashprint($param);
        }
        exit;
    }

    function generalAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array();

        $mode_read = $this->getRequest()->getPost('mode_read');
        if($mode_read == 'cek_genco_prolib'){
            $this->checkGencoProlib();
        }
        else if($mode_read == 'get_store_data'){
            $this->getStoreData();
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        exit;
    }

    function approvePurchaseletterFlashprint($param){
        $token = isset($param['token']) ? $param['token'] : NULL;

        $tokenid = 0;
        $pesan = "Token tidak valid.";
        if (strlen($token) > 0) {
            $model = new Erems_Models_Bypass();
            $hasil = $model->flashwebtokenRead($param);

            $pesan = "Token tidak terdaftar.";
            if ($hasil['success'] == true) {
                $menit      = 30;
                $totalMenit = 0;

                $result = $hasil['data'][0];

                $approved = intval($result["approved"]);

                if ($approved) {
                    $pesan = "Request flash print ini sudah di aktif.";
                } 
                else {
                    // cek jika sudah lebih dari 30 menit
                    // $now = $result["currentdate"];
                    // $exp = $result["expire_time"];
                    // $interval = $now->diff($exp);
                    $n = explode('.', $result["currentdate"]);
                    $x = explode('.', $result["expire_time"]);

                    $d1 = new DateTime($n[0]);
                    $d2 = new DateTime($x[0]);
                    $interval = $d1->diff($d2);

                    $jam        = $interval->format('%R%h');
                    $totalMenit = $interval->format('%R%i');
                    $totalMenit = ($jam * 60) + $totalMenit;

                    // jika sudah expire
                    if ($totalMenit < 0) {
                        $pesan = "Token sudah kadaluarsa <b>" . abs($totalMenit) . "</b> menit yang lalu. Silahkan request token baru lagi.";
                    } 
                    else {
                        $param['token_id'] = $result["token_id"];
                        $param['menit']    = $menit;

                        $final_result = $model->flashwebtokenapproveRead($param);
                        if($final_result['success'] == true){
                            $pesan   = "Flash print purchaseletter berhasil di aktifkan untuk unit ini.";
                            $tokenid = $result["token_id"];
                        }
                    }
                }
            }
        }

        $baseurl = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('/public', '', str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME'])));

        $html = '
            <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <title>Flash Print Purchaseletter</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="stylesheet" href="' . $baseurl . '/public/app/main/bootstrap/css/bootstrap.min.css" />
                        <script type="text/javascript" src="' . $baseurl . '/public/resources/jquery/jquery.js"></script>
                        <script type="text/javascript" src="' . $baseurl . '/public/app/main/bootstrap/js/popper.min.js"></script>
                        <script type="text/javascript" src="' . $baseurl . '/public/app/main/bootstrap/js/bootstrap.min.js"></script>
                    </head>
                    <body>

                        <div class="container">
                            <p>
                                <br/>
                                <br/>
                            </p>';


                if ($tokenid > 0) {
                    $html .= '<div class="alert alert-success">
                                    <strong>Berhasil!</strong> ' . $pesan . '
                                </div>';
                                
                } else {
                    $html .= '<div class="alert alert-warning">
                                    <strong>Warning!</strong> ' . $pesan . '
                                </div>';
                                
                }
                $html .= '
                            <p>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </p>

                            <div style="font-size: 12px;">
                                Copyright &copy; 2022 Ciputra Group. All rights reserved.                        
                            </div>

                        </div>

                    </body>
                </html>
                <script>
                    setTimeout(function(){
                        close();
                    }, 5000);
                </script>';
        echo $html;
        exit;
    }

    function checkGencoProlib(){
        $show_available = $this->getRequest()->getPost('show_available') ? $this->getRequest()->getPost('show_available') : 0;
        $projectid      = $this->getRequest()->getPost('projectid') ? $this->getRequest()->getPost('projectid') : $this->session->getCurrentProjectId();
        $projectname    = $this->getRequest()->getPost('projectname') ? $this->getRequest()->getPost('projectname') : $this->session->getCurrentProjectName();
        $ptid           = $this->getRequest()->getPost('ptid') ? $this->getRequest()->getPost('ptid') : $this->session->getCurrentPtId();
        $ptname         = $this->getRequest()->getPost('ptname') ? $this->getRequest()->getPost('ptname') : $this->session->getCurrentPtName();

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

        $arr           = array();
        $arr_available = array();
        if(get_class($genco) == 'Erems_Box_Projectptconfig_Genco'){
            $arr[] = 'Genco';
        }
        else{
            if($show_available){
                $arr_available[] = 'Genco';
            }
        }

        $dir          = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
        $prolibsFiles = scandir($dir);

        if (count($prolibsFiles) > 0) {
            $prolibsFiles      = preg_grep("/.js$/", $prolibsFiles);
            $className         = "Prolibs_" . $projectid . "_" . $ptid;
            $prolibsFileSearch = $className . ".js";
            if (!in_array($prolibsFileSearch, $prolibsFiles)) {
                $arr[] = 'Prolibs';
            }
            else{
                if($show_available){
                    $arr_available[] = 'Prolibs';
                }
            }
        }

        $msg = '';
        if(count($arr) > 0){
            $msg = 'Settingan ' . implode(' dan ', $arr) . ' Project ' . $projectname . ' - ' . $ptname . ' tidak di temukan.';
        }

        $msg_available = '';
        if(count($arr_available) > 0){
            $msg_available = 'Settingan ' . implode(' dan ', $arr_available) . ' Project ' . $projectname . ' - ' . $ptname . ' sudah ada.';
        }

        $result = array(
            'xtype_maskre'  => method_exists($genco, "getMaskreFieldInput") ? $genco->getMaskreFieldInput() : '',
            'msg'           => $msg, 
            'msg_available' => $msg_available
        );

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        exit;
    }

    function getStoreData(){
        $result    = array();
        $projectid = $this->session->getCurrentProjectId();
        $ptid      = $this->session->getCurrentPtId();

        if($this->getRequest()->getPost('param_data')){
            $param_data = $this->getRequest()->getPost('param_data');
            $param_data = Zend_Json::decode($param_data);

            foreach($param_data as $key => $val){
                $hasil_data = array('data' => array(), 'total' => 0, 'success' => false);
                $post_data  = array();

                if($val == 'cluster'){
                    $post_data['start']       = $this->getRequest()->getPost('start') ? $this->getRequest()->getPost('start') : 0;
                    $post_data['limit']       = $this->getRequest()->getPost('limit') ? $this->getRequest()->getPost('limit') : 25;
                    $post_data['cluster']     = $this->getRequest()->getPost('cluster') ? $this->getRequest()->getPost('cluster') : '';
                    $post_data['code']        = $this->getRequest()->getPost('code') ? $this->getRequest()->getPost('code') : '';
                    $post_data['description'] = $this->getRequest()->getPost('description') ? $this->getRequest()->getPost('description') : '';
                    $post_data['flag_svg']    = $this->getRequest()->getPost('flag_svg') ? $this->getRequest()->getPost('flag_svg') : '';

                    $model      = new Erems_Models_Mastercluster();
                    $hasil_data = $model->masterclusterRead($post_data);
                }
                else if($val == 'block'){
                    $post_data['start']       = $this->getRequest()->getPost('start') ? $this->getRequest()->getPost('start') : 0;
                    $post_data['limit']       = $this->getRequest()->getPost('limit') ? $this->getRequest()->getPost('limit') : 25;
                    $post_data['block']       = $this->getRequest()->getPost('block') ? $this->getRequest()->getPost('block') : '';
                    $post_data['code']        = $this->getRequest()->getPost('code') ? $this->getRequest()->getPost('code') : '';
                    $post_data['description'] = $this->getRequest()->getPost('description') ? $this->getRequest()->getPost('description') : '';
                    $post_data['cluster_id']  = $this->getRequest()->getPost('cluster_id') ? $this->getRequest()->getPost('cluster_id') : '';

                    $model      = new Erems_Models_Masterblock();
                    $hasil_data = $model->masterblockRead($post_data);
                }
                else if($val == 'reason_change'){
                    $post_data['start']                    = $this->getRequest()->getPost('start') ? $this->getRequest()->getPost('start') : 0;
                    $post_data['limit']                    = $this->getRequest()->getPost('limit') ? $this->getRequest()->getPost('limit') : 25;
                    $post_data['code']                     = $this->getRequest()->getPost('code') ? $this->getRequest()->getPost('code') : '';
                    $post_data['changeownershipreason_id'] = $this->getRequest()->getPost('changeownershipreason_id') ? $this->getRequest()->getPost('changeownershipreason_id') : '';

                    $model      = new Erems_Models_Masterchangeownershipreason();
                    $hasil_data = $model->masterchangeownershipreasonRead($post_data);
                }
                else if($val === 'city'){
                    $model = new Erems_Models_Master_CityDao();
                    $dt = $model->getAllWOR();
                    if(isset($dt[0][0]['totalRow']) && $dt[0][0]['totalRow'] > 0){
                        $hasil_data = array('data' => $dt[1], 'total' => $dt[0][0]['totalRow'], 'success' => true);
                    }
                }
                else if($val == 'purposebuy'){
                    $post_data['start'] = $this->getRequest()->getPost('start') ? $this->getRequest()->getPost('start') : 0;
                    $post_data['limit'] = $this->getRequest()->getPost('limit') ? $this->getRequest()->getPost('limit') : 0;
                    
                    $model      = new Erems_Models_Masterpurposebuy();
                    $hasil_data = $model->masterpurposebuyRead($post_data);
                }
                else if($val == 'all_purchaseletter'){
                    $post_data['unit_id'] = $this->getRequest()->getPost('unit_id') ? $this->getRequest()->getPost('unit_id') : 0;
                    if($post_data['unit_id']){
                        $model      = new Erems_Models_Purchaseletter();
                        $hasil_data = $model->allpurchaseletterRead($post_data);
                    }
                }
                else if($val === 'province'){
                    $model = new Erems_Models_Master_ProvinsiDao();
                    $dt = $model->getAllWOR();
                    if(isset($dt[0][0]['totalRow']) && $dt[0][0]['totalRow'] > 0){
                        $hasil_data = array('data' => $dt[1], 'total' => $dt[0][0]['totalRow'], 'success' => true);
                    }
                }

                $result[$val] = $hasil_data;
            }
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
        exit;
    }
}
?>