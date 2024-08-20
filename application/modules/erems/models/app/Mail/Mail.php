<?php

/**
 * Description of Mail
 *
 * @author MIS
 */
class Erems_Models_App_Mail {
    
    private $hasil;
    private $paramsObject;
    private $othersInfomartion;
    private $receiver;
    private $title;
    private $message;
    
    
    public function __construct(Erems_Models_Parameter_Parameter $po) {
        
        $this->hasil = array(
             "SEND_MAIL"=>FALSE,
             "SEND_STATUS"=>FALSE,
             "SEND_OTHERS"=>NULL // other information of send mail
         );
        $this->receiver = array();
        $this->paramsObject = $po;
    }
    
    public function addReceiver($email,$name){
        $this->receiver[] = array(
            "email"=>$email,
            "name"=>$name
        );
    }
    
    public function setTitle($title) {
        $this->title = $title;
    }

    public function setMessage($message) {
        $this->message = $message;
    }

        
    
    
    public function getHasil(){
        return $this->hasil;
    }
    
    public function setParamsObject(Erems_Models_Parameter_Parameter $po){
        $this->paramsObject = $po;
    }
    
    public function setOthersInformation($oi){
        $this->othersInfomartion = $oi;
    }


    public function process($hasilSaveUpdate=0){
        $sendMail = false;
         
        $others = $this->hasil;
         $statusSentMail = FALSE;
         
         if($hasilSaveUpdate > 0){ // jika berhasil save data, maka cek param send mail
             $params =$this->paramsObject;
             
             if($params instanceof Erems_Models_App_Mail_SendMail){
                 $sendMail = intval($params->getSendMail());
             }
            
             
             
           
             
             
             if($sendMail > 0){
                 $others["SEND_MAIL"] = TRUE;
                 try {
                     
                     $others["SEND_STATUS"] = TRUE;
                     
                     
                    $mainMessage = "[PURCHASELETTER_INFORMATION]";
                    
                    
                    
                    
                    
                    $others["SEND_OTHERS"] = $this->othersInfomartion;
                     
                    $message = $this->message;

                    

                    




                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                    $mail->getMail()->setBodyHtml(nl2br($message));
                    $mail->getMail()->addTo($this->receiver[0]["email"],$this->receiver[0]["name"]);
                    if(count($this->receiver) > 1){ /// jika lebih dari 1 orang
                        for($i=1;$i<$this->receiver;$i++){
                            $mail->getMail()->addCc($this->receiver[$i]["email"],$this->receiver[$i]["name"]);
                        }
                        
                    }
                    $mail->getMail()->setSubject($this->title);
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $statusSentMail = FALSE;
                }
             }
         }
         
         $this->hasil = $others;
    }
}

?>
