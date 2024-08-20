<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LosariMakassar
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_LosariMakassar extends Erems_Models_Suratperingatan_Default {
    public function getHTML(){
        return '<style>
                	table {
                    border-collapse: collapse;
                }

                table, td, th {
                    border: 1px solid black;
                	font-size:12px;
                }
                td{
                	padding:2px 10px;
					border:0px;
                }


td.rp{
    border-bottom: 1px solid black;
    border-top: 1px solid black;
}
td.full{
    border: 1px solid black;
    
}
td.price{
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-right: 1px solid black;
    
}

table.khusus td{
    padding:0px;
    border:0px;
}
table.khusus{
    border:0px;
}


    p.spstyle_p{
        font-size: 12px;
    }
	p.spstyle_p_small{
        font-size: 8px;
	
    }
</style>
<p class="spstyle_p">
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</p>
<p class="spstyle_p" align="right" style="float: right;margin: 0;">Makassar, <b>{{tanggal_print}}</b></p>
<p class="spstyle_p">
No.	:  {{nomor_sp_teratas}}<br/>
Hal	:  Surat Peringatan {{sp_surat_ke}}<br/>
<br/>
Kepada Yth,<br/>
Bapak/Ibu {{customer_name}}<br/>
Di – {{{customer_address}}}<br/>


<br/>
Dengan hormat,<br/>
Pertama-tama kami mengucapkan terimakasih atas kepercayaan Bapak/Ibu terhadap produk kami dengan pemesanan rumah/kavling di {{unit_number}} di CitraLand City CPI Makassar. <br/>
<br/>
Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, melalui surat ini kami ingin memberitahukan tentang pembayaran yang sudah jatuh tempo yang hingga saat ini kami belum menerima pembayarannya, sehingga total yang harus Bapak/Ibu bayar adalah sebesar :
Rp. <b>{{total_tagihan_teks}}</b> ({{total_tagihan_terbilang}}) , belum termasuk denda, dengan rincian sebagai berikut :<br/>
<br/>
 <table>
					<tbody>
						<tr style="background-color: #e8e9ea;font-weight: bold;">
							<td>Tagihan</td>
							<td>Termin</td>
							<td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan</td>
							<!--<td>Keterlambatan (hari) </td><!--<td>Nomor SP - Tanggal SP</td>-->
							<td>Denda Keterlambatan </td><!--( s/d {{max_date}} )*</td>-->
							<td>Total Dibayar </td><!--( s/d {{max_date}} )*</td>-->
						</tr>
                {{{list_tagihan}}}
                </tbody></table>
<br/>
Kami  mohon Bapak/Ibu dapat melunasi pembayaran tersebut, nilai denda sewaktu – waktu dapat berubah apabila tunggakan belum dilunasi. Dengan perhitungan denda sebagai berikut ( Angsuran / 1000 x hari keterlambatan ).<br/><br/>
<!--{{tgl_paling_lambat}}-->
Adapun pembayarannya dapat langsung mentransfer ke rekening : <br/>
<!--ke Kantor Pemasaran CitraLand City CPI Makassar <br/>atau dengan 
mentransfer ke rekening : <br/>-->

<table style="border:none;">
                  <tr style="border:none;">
                    <td style="border:none;"><li></li></b></td>
                    <td style="border:none;">KSO Ciputra Yasmin, <b>Bank BCA</b>, KCU Ahmad Yani, Makassar  : <b>025-344-7777</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;</b></td>
                    <td style="border:none;">atau rekening :</td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;"><li></li></b></td>
                    <td style="border:none;">KSO Ciputra Yasmin, <b>Bank Mandiri</b>, KCU Kartini, Makassar : <b>152.00.337777.86</b></td>
                  </tr>
				  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;</b></td>
                    <td style="border:none;">dengan memberi berita/keterangan <b>{{unit_number}}</b></td>
                  </tr>
                </table>
				
<!--KSO Ciputra Yasmin, Bank BCA, KCU Ahmad Yani, Makassar  : 025-344-7777 <br/>
atau rekening :<br/>
KSO Ciputra Yasmin, Bank Mandiri, KCU Kartini, Makassar : 152.00.337777.86<br/>
dengan memberi berita {{unit_number}}  <br/>-->
<br/>
Apabila Bapak/Ibu telah menyelesaikan kewajiban tersebut kami mohon bukti pembayarannya dapat di scan atau di photo dan di email ke :  collection.clcl@ciputra.com atau whatsapp ke 0812 4466 9434<br/>
<br/>
Atas perhatian dan kerjasama Bapak/Ibu, kami  ucapkan terimakasih.<br/>
<br/>
Hormat  Kami,<br/>
KSO Ciputra Yasmin<br/>
<br/>
<br/>
<br/>
<b>Mita Yusnia</b><br/>
Section Head Finance Accounting<br/>
<table class="khusus">
<tr><td style="width:20px;">cc:</td><td> Anastasia A. Winardi	(Marketing Manager)</td></tr>
<tr><td>&nbsp;</td><td> {{salesman_name}} (Marketing Executive/Agent)</td></tr>
</table>
<br/>
</p>

';
    }
    
    // public function getListTagihanHTML($params){
        // $schedule = $params["schedule"][0];
        // $total = 0.0;
     
        
        // $table = "<table width='500'>";
        // foreach($schedule as $row){
      
            // $table .="<tr><td class='full'>Angsuran ".$row["scheduletype"]." Ke - ".$row["termin"]."</td><td class='rp'>Rp.</td><td align='right' class='price'>".Erems_Box_Tools::toCurrency($row["remaining_balance"])."</td></tr>";
             // // $table .="<tr><td>Angsuran Ke - </td><td> Rp. ".$row["remaining_balance"]." </td></tr>";
            // $total += $row["remaining_balance"];
            
        // }
        
        // $table .= "<tr><td class='full'><b>Total yang harus dibayarkan</b></td><td class='rp'>Rp.</td><td align='right' class='price'><b>".Erems_Box_Tools::toCurrency($total)."</b></td></tr>";
        // $table .="</table>";
        // return $table;
    // }
	
	public function getListTagihanHTML($params){
		
		//var_dump($params);
		
        //return "";
			$schedule = $params["schedule"][0];
			$total = 0.0;
			$ttldenda_terlambatb=0;
            $ttlremaining_balance=0;
            $table = "";

         foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
             }else{
                 $denda = $row["denda_terlambat"];
             }
			
             $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
             $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
             $table .='<tr>
                         <td align="center">'.$row["scheduletype"].'</td>
                         <td align="center">'.$row["termin"].'</td>
                         <td align="center">'.date('d-m-Y',strtotime($row["duedate"])).'</td>
                         <td align="right">Rp. '.number_format($row["remaining_balance"],2).'</td>
                         <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                         <td align="right">Rp. '.number_format($denda).'</td>
                         <td align="right">Rp. '.number_format($row["remaining_balance"]+$denda,2).'</td>
                     </tr>';
         }

         $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance,2).'</td>
                 <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb,2).'</td></tr>';
		 return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
      
}
