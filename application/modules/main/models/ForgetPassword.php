<?php

/**
 * Description of ForgetPassword
 *
 * @author TOMMY-MIS
 */
class Main_Models_ForgetPassword {

    private $tKey = "5262w672472huhet36774724f";
    private $fKey = "dfgty647hd445000234mg"; /// form key
   // private $url = "http://localhost/ciputragit/public/";
    private $url = "https://ces.ciputragroup.com:73/webapps/Ciputra/public/";
    private $tokenModuleName = "FGP";
    public $dao;

    //https://ces.ciputragroup.com/webapps/Ciputra/public/

    public function getUrl($token, $id) {
        $url = $this->url . "?trequest=" . $this->tKey . "&token=" . $token . "&source=email&m=" . $this->tokenModuleName . "&i=" . $id;
        return $url;
    }

    public function updataPassword(Zend_Controller_Action $controller, $key) {
        if ($key == $this->tKey) {
            $key = $controller->getRequest()->getPost('key');
            // dari form update password

            if ($key == $this->fKey) { // submit password baru
                $m = $controller->getRequest()->getPost('m');
                $code = $controller->getRequest()->getPost('code');
                $i = $controller->getRequest()->getPost('i');
                $pass = $controller->getRequest()->getPost('p');

                $status = 0;
                $message = "";

                if (strlen($m) > 0 && strlen($code) > 0 && strlen($i) > 0) {
                    $message = "Sedang process.";


                    $dao = new Main_Models_WebSec();
                    $updatePass = $dao->updateUserPassword($i, $code, $m, md5($pass));


                    $sukses = FALSE;
                    if (is_array($updatePass)) {
                        if (count($updatePass) > 0) {
                            $sukses = TRUE;
                            $status = TRUE;
                        }
                    }

                    if (!$sukses) {
                        $message = "[ERR002] Something problem when processing your request.";
                    } else {
                        $message = "Success process your request.";
                    }
                } else {
                    $message = "[ERR001] Invalid request";
                }

                $data = array("status" => $status, "message" => $message);



                echo json_encode($data);
                $controller->myViewNoRender();
            } else {

                $cekToken = FALSE;
                
                $expire = $this->cekToken($controller->getRequest()->getParam('m'),$controller->getRequest()->getParam('token'),$controller->getRequest()->getParam('i'));
                
            

                if ($expire) {
                    $controller->myViewRenderer('forgetpasswordexpire');
                } else {
                    $formUrl = $this->url . "?trequest=" . $this->tKey;
                    $controller->view->form_key = $this->fKey;
                    $controller->view->url = $this->url;
                    $controller->view->form_url = $formUrl;
                    $controller->view->m = $controller->getRequest()->getParam('m');
                    $controller->view->code = $controller->getRequest()->getParam('token');
                    $controller->view->i = $controller->getRequest()->getParam('i');

                    $controller->myViewRenderer('updatepassword');
                }
            }
        }
    }

    public function generateToken($recordId) {



        $menit = 30;

        $pesan = "";

        $hasil = FALSE;

        $dataSave = NULL;




        if ($recordId > 0) {
            $aDao = new Main_Models_Auth();

            //cek jika sudah ada request untuk unit ini
            $tokenExist = $aDao->getFlashWebToken($recordId, $this->tokenModuleName);


            if (is_array($tokenExist)) {
                if (count($tokenExist) > 0) {
                    $tokenExist = $tokenExist[0];
                }
            } else {
                $tokenExist = NULL;
            }


            if ($tokenExist) {
                $expireTime = new DateTime($tokenExist["expire_time"]);


                // cek jika sudah lebih dari 30 menit
                $now = new DateTime($tokenExist["currentdate"]);



                $interval = $now->diff($expireTime);

                $jam = $interval->format('%R%h');



                $totalMenit = $interval->format('%R%i');



                $totalMenit = ($jam * 60) + $totalMenit;
            }


            // jika sudah expire atau belum ada request
            if (($tokenExist && $totalMenit < 0 ) || !$tokenExist) {
                // generate token

                $token = sha1(time());

                $saveToken = $aDao->saveFlashWebToken($this->tokenModuleName, $recordId, $token, $menit);

                $dataSave = $saveToken;



                $hasil = TRUE;
            } else {


                $pesan = "A password change request has been generated for this user. You have " . $totalMenit . " minutes to change your password.";
            }


            //end cek jika 
        } else {
            $pesan = "Request tidak valid.";
        }

        return array(
            "pesan" => $pesan,
            "hasil" => $hasil,
            "data_save" => $dataSave
        );
    }

    public function cekToken($module,$tokenData,$id) {
        $aDao = new Main_Models_WebSec();
        $hasil = $aDao->getFlashWebToken2($module,$tokenData,$id);

        $expire = TRUE;
  

        if (is_array($hasil)) {
            if (count($hasil) == 0) {
                $pesan = "Token tidak terdaftar.";
            } else {
                $token = $hasil[0];



                $expireTime = new DateTime($token["expire_time"]);

                //  $expireTime = new DateTime($token["expire_time"]);
                // cek jika sudah lebih dari 30 menit
                //  $now = new DateTime($token["currentdate"]);
               
                
                $now = new DateTime($token["currentdate"]);


                $interval = $now->diff($expireTime);

                $jam = $interval->format('%R%h');
                $totalMenit = $interval->format('%R%i');
                $totalMenit = ($jam * 60) + $totalMenit;



                // jika sudah expire
                if ($totalMenit < 0) {

                    
                } else {
                    $expire = FALSE;
                }
            }
        }
        
        return $expire;
    }

}
