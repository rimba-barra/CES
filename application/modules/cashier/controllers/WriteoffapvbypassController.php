<?php
class Cashier_WriteoffapvbypassController extends Zend_Controller_Action {
    function init() {
        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null)
                {
                    throw new Zend_Controller_Action_Exception('This page does not exist', 404);
                }
        }
    }
    function statusAction(){
        $check = end(explode('/', $_SERVER['REQUEST_URI']));
        $model = new Cashier_Models_Master_Writeoffapvbypass();
        $sendStatus = false;
        $queryString = explode('&',base64_decode($check));
        foreach ($queryString as $key => $value) {
            list($k,$v) = explode('=',$value);
            $param[$k] = $v;
        }
//        echo $param['approveid']."<br>"; exit;
        if($param['status'] == 'REJECT'){
            $param['status'] = '2';
            $sendStatus = $model->updatestatuswo($param);
            if($sendStatus['data']['result']==1){
                echo '<script>alert("Writeoff berhasil di REJECT");close();</script>';//'.$param['status'].'
            }
            else{
                echo '<script>alert("Gagal, Writeoff sudah di approve / reject");close();</script>';
            }
            exit;
        }
        else{
            if($param['user'] == 'API' && $param['pass'] == 'API'){
                if($param['status'] == 'APPROVE'){
                    //nanti cek ke approval list
                    $param['status'] = '1';
                }
                $sendStatus = $model->updatestatuswo($param);
            }
            if($sendStatus['data']['result']==1){
                echo '<script>alert("Writeoff berhasil di APPROVE");close();</script>';//'.$param['status'].'
            }
            else{
                echo '<script>alert("Gagal, Writeoff sudah di approve / reject");close();</script>';
            }
        }
        // session_destroy();
        exit;
    }

    function rejectAction($param){
        $sendStatus = false;
        $model = new Erems_Models_Master_Pricelist();
        if(isset($param['rejectNotes'])){
            $sendStatus = $model->pricelistSetStatusDocStatus($param);

            if($sendStatus['success']){
                echo '<script>alert("Berhasil Pricelist '.$sendStatus['data']['keterangan'].' sudah di '.$param['status'].'");close();</script>';
            }
            else{
                echo '<script>alert("Gagal, Pricelist sudah di approve / reject");close();</script>';
            }
            // session_destroy();
        }
        else{
            $sendStatus = $model->pricelistCheckStatusDoc($param);
            if($sendStatus['success']){
                $urlDataReject = 'user=API&pass=API&pricelist_id='.$param['pricelist_id'].'&approveid='.$param['approveid'].'&modules='.$param['modules'].'&time='.mktime().'&approveorder='.$param['approveorder'].'&approveemail='.$param['approveemail'].'&project_id='.$param['project_id'].'&pt_id='.$param['pt_id'].'&status=REJECT'.'&rejectNotes=';

                // $urlDataReject  = 'user=API&pass=API&pricelist_id='.$param['pricelist_id'].'&status=REJECT&approveid='.$param['approveid'].'&rejectNotes=';
                // $urlReject     = $_SERVER['HTTP_HOST'].'/webapps/public/'.$param['modules'];//$_SERVER['HTTP_REFERER'].'erems/masterpricelist/status/';
                $urlReject     = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/reroute.php/';

                echo '<p id="demo"></p>
                <script>
                    var txt;var redirectUrl = "";
                    var rejectNotes = prompt("Reject Notes:");
                    if (rejectNotes == null || rejectNotes == "") {
                        close();
                    } else {
                        txt = "'.$urlDataReject.'"+rejectNotes;
                        txt = btoa(txt);
                        redirectUrl = "'.$urlReject.'"+txt;
                        // location.replace("'.$urlReject.'"+txt);
                        location.replace(redirectUrl);
                    }
                    // document.getElementById("demo").innerHTML = redirectUrl;
                </script>';
            }
            else{
                echo '<script>alert("Gagal, Pricelist sudah di approve / reject");close();</script>';
            }
        }
        // session_destroy();
        exit;
    }

}
?>