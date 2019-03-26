const pooledHtmlOrder = `
<!DOCTYPE html>
<html>
<head>
    <title>Order 16828368</title>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link href="/reshome/Content/Orders.he.css?ver8" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="/reshome/Content/Images/favicon/RTL/favicon.ico" type="image/x-icon" />
</head>
<body>
    <div class="mobileBackButton">
        <input id="backButton" type="button" value="חזור" data-without-refresh="" />
    </div>

    
    
<link href="/reshome/Content/ActionPanel.he.css?ver=15" rel="stylesheet" type="text/css" />
<script src="/reshome/Scripts/jquery-1.9.0.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery-ui.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/ResHome.OrdersActionPanel.unobtrusive.1.0.js?ver=15" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery.fancybox.pack.js" type="text/javascript"></script>
<link rel="stylesheet" href="/reshome/Content/jquery.fancybox.css" />
<style>
    
.EstimatedTimeToArrovalPopupDiv {
   z-index: -1;
   font-size: 20px;
   /*width: 796px;*/
   color: black;
   display:none;
   background-color:#FFFFFF;
   padding: 2px 0 25px 0;
   direction: rtl;
}

#EstimatedTimeToArrovalPopup h4 {
 font-weight: bold;
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
}


div.EstimatedTimeToArrovalPopupTilteDiv {
   background-color:#EAEAEA;
   padding: 10px 15px 25px 15px;
   /*margin-top:10px;*/

}
.EstimatedTimeToArrovalPopupMessagePrviewDiv {
   background-color:#FFFFFF;
   width: 98%;
   padding:6px 5px 0px;
   height: 30px;
   border-style: groove;
   border-width: 1px;
   /*margin-right:10px*/
}

.EstimatedTimeToArrovalPopupButtonContainerDiv button{
      color: #FFFFFF;
      width:120px;
      height:55px;
      border: none;
      text-align: center;
      margin:15px 17px 10px 15px;
      font-size: 20px;
      cursor: pointer;
}
.EstimatedTimeToArrovalPopupButtonContainerDiv{
    padding-right:5px;
}
.EstimatedTimeIconTable { 
    margin: auto;
    margin-top: 7px;
    border: none;
    margin:0px 0px 10px 0px;
    font-size: 20px;
}
.EstimatedTimeIconTable td {
    border: none;
}
.TimeButtons:active {
      color: black;
}
</style>
<div class="actionPanel" 
    data-actionPanel-floating-div="true" data-actionPanel-orderId = "16828368" data-actionPanel-orderType="Pooled" data-actionPanel-orderStatus="InProcess" data-actionPanel-nextOrderStatus="OutForDelivery"
    data-actionPanel-resId = "23175"   data-actionPanel-setOrderPrintingStatus-url = "/reshome/orders/SetOrderPrintingStatus"
    data-actionPanel-changeOrderStatus-url = "/reshome/orders/ChangeOrderStatus" data-actionPanel-contactTenBis-url = "/reshome/orders/SetResContact"
    data-selected-action="None">
    <div>
        <ul id="actions-legend">
                            <li>
                    <div class="actionLable">
                        <span class="actionLable">הדפס הכל</span></div>
                    <div>
                        <img name="printAll"  data-actionPanel-action="printAll" src="/reshome/Content/Images/Print.gif" alt="הדפס הכל" 
                             data-actionPanel-orderId="16828368" data-actionPanel-orderType="Pooled"
                             data-actionPanel-setOrderPrintingStatus-url="/reshome/orders/SetOrderPrintingStatus"
                             data-last-order-id-in-pool="31704948"/></div>
                </li>
                                        <li>
                    <div class="actionLable">
                        <span class="actionLable"><label for="">הזמנה יצאה ללקוח</label></span></div>
                         <img name="confirm"
                            data-actionpanel-action="confirm"  
                         src="/reshome/Content/Images/OK.gif" alt="הזמנה יצאה ללקוח" 
                         data-actionPanel-changeOrderStatus-url="/reshome/orders/ChangeOrderStatus"
                         data-actionPanel-orderId="16828368" data-actionPanel-orderType="Pooled" 
                         data-actionPanel-orderStatus="InProcess"
                         data-actionPanel-nextOrderStatus="OutForDelivery"
                         data-actionPanel-resId="23175"/>
                </li>
                    </ul>
    </div>
        <div class="actionLable actionLableFooter">
            הזמנה זו הודפסה ב - 26/03/2019 10:45:00
        </div>
    
</div>
<script type="text/javascript">

    $("div[data-actionPanel-floating-div='true']").ready(function () {
        if ($("div[data-actionPanel-floating-div='true']").length > 0) {
            var actionPanelDivObj = $("[data-actionPanel-floating-div='true']");

            window.onfocus = function () {
                $("[data-actionPanel-floating-div='true']").show();
            }

            if (actionPanelDivObj.size() > 0) {     
                var selectedAction = $(actionPanelDivObj).data("selected-action");

                switch(selectedAction){
                    case "PrintAll":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAll']").click();
                        break;
                    case "PrintNew":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printNew']").click();
                        break;
                    case "PrintAndConfirm":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAndConfirm']").click();
                        break;
                    case "PrintAndConfirmAndSetEstimatedTime":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAndConfirmAndSetEstimatedTime']").click();

                        break;
                    default:
                        break;
                }                               
            }

            $(document).bind("OrderConfirmed ContactedTenBis", function () {
                closeWindow();
            });
        }
    });    

    function closeWindow() {
        if(self.opener){
            window.open('', '_parent', '');
            self.opener.location.reload();
            self.close();
        }
        else { // mobile - the same window
            var witoutRefresh = false;
            back(witoutRefresh);
        }
    }

    function back(witoutRefresh) {
        if (witoutRefresh) {
            window.history.back();
        }
        else {
            window.location.href = document.referrer;
        }
    }
</script>

    <table class="OrderMainTableClass" align="center" border="0" dir="rtl">
        <tr>
            <td align="center">
                <table width="80%" align="center" border="0" class="OrderHeaderTableClass">
                    <tr>
                        <td align="center">
                            <span class="OrderHeaderClass">
                                הזמנה מרוכזת מתן ביס למסעדת עלמה פסטה וסלט
                                <br />
                            </span>
                            <span class="OrderNumberClass">
                                תחילת הזמנה מרוכזת מספר<span>: </span>
                                8368
                                <br />
                            </span>
                            <center data-canceled-orders-msg="true">
                                מועד אספקת ההזמנה בתאריך 26/03/2019 בשעה 12:30
                            </center>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table border="0" id="OrderCustomerDetailsTable">
                    
                    <tr>
                        <td style="width: auto;" valign="top">
                            <table>
                                <tr>
                                    <td>
                        <label for="Address_CompanyName">חברה</label>:
                                    </td>
                                    <td><span class="OrderCustomerBoldClass CustomerHighlightData">
                                        בר B2D</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                        <label for="Address_AddressLine">כתובת</label>:
                                    </td>
                                    <td class="OrderCustomerBoldClass CustomerHighlightData">
                        הכשרת היישוב 23, ראשון לציון 
                                    </td>
                                </tr>
                                                    <tr>
                                        <td>
                            <label for="Address_Floor">קומה</label>:
                                        </td>
                                        <td>
                            0
                                        </td>
                                    </tr>
                            </table>
                        </td>
                        <td style="width: auto;" valign="top">
                            <table>
                                                                            <tr>
                                        <td>
                                <label for="Address_PhoneNumber">טלפון</label>:
                                        </td>
                                        <td>
                                0502383737
                                        </td>
                                    </tr>
                                                </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table border="0" class="PooledOrderItemsTableClass">
                    
                    <tr>
                        <td>
                        </td>
                    </tr>
                        <tr>
                            <td>

                        <div data-actionpanel-hidebeforeprinting="true" data-max-printed-order-id="31704948">
                                        <table border="0" width="100%">
                                            <tr>
                                                <td class="PooledOrderPrintedTitleClass">
                                <span><label for="PrintedOrders">הזמנות שהודפסו</label>:</span>
                                                </td>
                                            </tr>
                                                <tr>
                                                    <td>
                                    <table class="PooledOrderDishBlockClass " border="0">
        <tr>
        <td colspan="1" class="PooledOrderSerialNumberClass">
            <p style="display:inline;margin:0px;padding:0px;font-size:20px;">
            <label for="SerialNumber">מספר מנה:</label>
            1<span>.</span></p>
            <label for="User_Name">שם</label>:
            <span class="CustomerHighlightData">שירי אביגדור</span><span>;</span>
<label for="User_Phone01">טלפון</label><span>:</span>
-6933827<span>;</span>
            0502383737                <span>;</span>
        </td>
    </tr>
    <tr>
        <td class="PooledOrderDishDetailsClass">
            <table width="100%" style="height: 100%" border="0">
                
                            <tr>
                        <td height="100%" width="85%">
                        <span class="OrderDishNameClass">
                            סלטים בהרכבה אישית 
                            >>
                            סלט גדול בהרכבה 
                        </span>
                            <span class="OrderDishDescClass">
                                    סלט גדול בהרכבה 1000 מ&quot;ל , בתוספת 2 רטבים לבחירה ולחם לבחירה
 .</span>
                            <br />
                        בחר/י את המרכיבים לסלט:                                     <span class="OrderItemsSubDescClass">עלי חסה</span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">עלי בייבי </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">עגבניה</span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">מלפפון </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">פטריות שמפניון </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">אפונת גינה </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">גרגירי חומוס </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">בורגול </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">פרחי כרובית </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">בצל ירוק </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">פטרוזיליה</span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">בזיליקום </span>
                                        <span>.</span>
                                <br />
בחר/י אם ברצונך תוספות פינוקים בתשלום:                                    <span class="OrderItemsSubDescClass">שווארמה טבעונית - עם בצל מטוגן ופטרוזיליה </span>
                                        <span>(</span>₪10.00<span>)</span>
                                        <span>.</span>
                                <br />
בחר/י את הרטבים:                                     <span class="OrderItemsSubDescClass">לימון </span>
                                        <span>,</span>
                                    <span class="OrderItemsSubDescClass">טחינה</span>
                                        <span>.</span>
                                <br />
 תוספת רטבים בתשלום:                                 <br />
לחם לבחירה:                                     <span class="OrderItemsSubDescClass">ג&#39;בטינה</span>
                                        <span>.</span>
                                <br />
                        <label for="dish_Remarks">הערות מיוחדות:</label>                                <span class="OrderDishRemarksClass">
                                    שירי אביגדור
                                </span>
                                <span>.</span>
                                <span class="OrderDishRemarksClass">
                                    היי, אשמח שהשווארמה הטבעונית תגיע בצד.</span>
                                <span>.</span>
                        </td>
                        <td width="5%" valign="top" height="100%">
                                <span class="OrderSingleDishClass">
                                    x
                                    1
                                </span>
                        </td>
                        <td width="10%" height="100%" valign="top">
                        <span>₪43.00</span>
                        </td>
                    </tr>
                            <tr>
                        <td colspan="2">
                    5% הנחה ע&quot;ח המסעדה
                        </td>
                        <td>
                    ₪-2.15
                        </td>
                    </tr>
                            <tr>
                        <td colspan="2">
                    <label for="Payment_Tip">טיפ:</label>
                        </td>
                        <td>
                    ₪ 5.00
                        </td>
                    </tr>

                <tr>
                    <td colspan="2" align="left" >
                <span style="text-decoration: none;">סה&quot;כ לתשלום:</span>
                    </td>
                    <td>
                    <span style="text-decoration: underline;">
                        ₪45.85
                                                                
                                
                    </span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

                                                    </td>
                                                </tr>
                                        </table>
                                </div>

                            </td>
                        </tr>
                </table>
            </td>
        </tr>
        <tfoot>
            <tr>
                <td>
                    <table class="PooledOrderTotalPriceClass">
                        <tr>
                            <td align="right" width="85%">
                    סה&quot;כ לתשלום:
                            </td>
                            <td>
₪45.85                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <center>
                        <span class="OrderNumberClass">
                            סוף הזמנה מרוכזת מספר:
                            8368
                        </span>
                    </center>
                </td>
            </tr>
        </tfoot>
    </table>
        <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-235558-2']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>

    <script>
        $("#backButton").click(function () {
            var withoutRefresh = $(this).data("without-refresh");
            back(withoutRefresh);
        });
    </script>

</body>
</html>
`;

const standardHtmlOrder = `
<html>
<head>
    <title>Order 31713017</title>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link href="/reshome/Content/Orders.he.css?ver8" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="/reshome/Content/Images/favicon/RTL/favicon.ico" type="image/x-icon" />
</head>
<body>
    <a href="#EstimatedTimeToArrovalPopup" id="EstimatedTimeToArrovalPopupAnchor"></a>
    <div id="EstimatedTimeToArrovalPopup" class="EstimatedTimeToArrovalPopupDiv"
         data-estimated-arrival-time-changeorderstatus-url="/reshome/orders/ChangeOrderStatus"
         data-estimated-arrival-time-orderid=31713017 
         data-estimated-arrival-time-ordertype=Standard
         data-estimated-arrival-time-orderstatus=InProcess
         data-estimated-arrival-time-nextorderstatus="InProcess"
         data-estimated-arrival-time-resid=23175
         data-estimated-arrival-time-res-name=עלמה פסטה וסלט
         data-estimated-time-to-arrival-customer-full-name= ימית שלק
         data-action-print=""
         data-estimated-time-to-arrival-changeOrderStatus-url="/reshome/orders/ChangeOrderStatus" 
         data-estimated-time-to-arrival-setOrderPrintingStatus-url="/reshome/orders/SetOrderPrintingStatus"
         data-actionpanel-delivery-method=Delivery
         data-estimated-arrival-time-title=  עדכנו את ימית שלק מתי המשלוח יגיע לגולדה מאיר 7, נס ציונה            data-estimated-arrival-message-preview="היי ימית, מעלמה פסטה וסלט מעדכנים שהמשלוח יגיע אליך בעוד כ 20 דקות"
        data-actionpanel-estimated-time-button-title="לאישור ההזמנה, בחרו את זמן הגעת המשלוח "
         >
        <div>
            <h4 data-set-estimated-time-arrival-popup-title="true">
  עדכנו את ימית שלק מתי המשלוח יגיע לגולדה מאיר 7, נס ציונה               </h4>
            <div data-estimated-arrival-time-dish-content="true">
                <div style="border-top: 1px solid #B1B1B1;margin:0px 25px;">
                    <ul style="list-style:none; padding: 0px">
                                                <li style="list-style:none;line-height: 1.6em;">
                            <span><b>1 x </b>עסקית פשטידת קיש + סלט אישי - חדש!!</span>
                        </li>
                    </ul>
                </div>
                </div>
                <div class="EstimatedTimeToArrovalPopupTilteDiv">
                    <table class="EstimatedTimeIconTable">
                        <tbody>
                            <tr>
                                <td style="width:5px;">
                                    <img src="/reshome/Content/Images/pendingOrders/clockIcon.png" />
                                </td>
                                <td>
                                    <span>הזמן המשוער ישלח באמצעות הודעת SMS</span>, <span> תצוגה מקדימה:</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="EstimatedTimeToArrovalPopupMessagePrviewDiv">

                        <span data-set-estimated-time-arrival-message-preview="true">
היי ימית, מעלמה פסטה וסלט מעדכנים שהמשלוח יגיע אליך בעוד כ 20 דקות                        </span>
                        <span data-set-estimated-time-arrival-message-preview-selcted-time="true"></span>

                    </div>
                </div>
            </div>
        <div>
       </div>
       <div class="EstimatedTimeToArrovalPopupButtonContainerDiv">
           <div style="text-align: center;color:#C8272E;font-weight: bold;" data-set-estimated-time-button-title-div="true">לאישור ההזמנה, בחרו את זמן הגעת המשלוח </div>
           <div>
               <button class="TimeButtons" style="background-color:#F9AAAD;border-color:#F89499;" data-set-estimated-time-to-arrival-button="true" type="button" value="10">10 דקות</button>
               <button class="TimeButtons" style="background-color:#F7767B;border-color:#F76A72;" data-set-estimated-time-to-arrival-button="true" type="button" value="20">20 דקות</button>
               <button class="TimeButtons" style="background-color:#FA595F;border-color:#FA5054;" data-set-estimated-time-to-arrival-button="true" type="button" value="30">30 דקות</button>
               <button class="TimeButtons" style="background-color:#E93B42;border-color:#E71823;" data-set-estimated-time-to-arrival-button="true" type="button" value="40">40 דקות</button>
               <button class="TimeButtons" style="background-color:#DB383E;border-color:#B62125;" data-set-estimated-time-to-arrival-button="true" type="button" value="50">50 דקות</button>
           </div>
           <div>
               <button class="TimeButtons" style="background-color:#FF5B5B;border-color:#FF4848;" data-set-estimated-time-to-arrival-button="true" type="button" value="60">60 דקות</button>
               <button class="TimeButtons" style="background-color:#D54449;border-color:#D02F33;" data-set-estimated-time-to-arrival-button="true" type="button" value="70">70 דקות</button>
               <button class="TimeButtons" style="background-color:#AB282D;border-color:#912227;" data-set-estimated-time-to-arrival-button="true" type="button" value="80">80 דקות</button>
               <button class="TimeButtons" style="background-color:#952024;border-color:#881E21;" data-set-estimated-time-to-arrival-button="true" type="button" value="90">90 דקות</button>
               <button class="TimeButtons" style="background-color:#6f1316;border-color:#881E21;" data-set-estimated-time-to-arrival-button="true" data-set-estimated-time-to-arrival-over-90-min="true" type="button" value="120">+90 דקות</button>
           </div>
        </div>

    </div>

     <div class="mobileBackButton">
        <input id = "backButton" type="button" value="חזור" data-without-refresh="" />
    </div>
    
<link href="/reshome/Content/ActionPanel.he.css?ver=15" rel="stylesheet" type="text/css" />
<script src="/reshome/Scripts/jquery-1.9.0.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery-ui.min.js" type="text/javascript"></script>
<script src="/reshome/Scripts/ResHome.OrdersActionPanel.unobtrusive.1.0.js?ver=15" type="text/javascript"></script>
<script src="/reshome/Scripts/jquery.fancybox.pack.js" type="text/javascript"></script>
<link rel="stylesheet" href="/reshome/Content/jquery.fancybox.css" />
<style>
    
.EstimatedTimeToArrovalPopupDiv {
   z-index: -1;
   font-size: 20px;
   /*width: 796px;*/
   color: black;
   display:none;
   background-color:#FFFFFF;
   padding: 2px 0 25px 0;
   direction: rtl;
}

#EstimatedTimeToArrovalPopup h4 {
 font-weight: bold;
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
}


div.EstimatedTimeToArrovalPopupTilteDiv {
   background-color:#EAEAEA;
   padding: 10px 15px 25px 15px;
   /*margin-top:10px;*/

}
.EstimatedTimeToArrovalPopupMessagePrviewDiv {
   background-color:#FFFFFF;
   width: 98%;
   padding:6px 5px 0px;
   height: 30px;
   border-style: groove;
   border-width: 1px;
   /*margin-right:10px*/
}

.EstimatedTimeToArrovalPopupButtonContainerDiv button{
      color: #FFFFFF;
      width:120px;
      height:55px;
      border: none;
      text-align: center;
      margin:15px 17px 10px 15px;
      font-size: 20px;
      cursor: pointer;
}
.EstimatedTimeToArrovalPopupButtonContainerDiv{
    padding-right:5px;
}
.EstimatedTimeIconTable { 
    margin: auto;
    margin-top: 7px;
    border: none;
    margin:0px 0px 10px 0px;
    font-size: 20px;
}
.EstimatedTimeIconTable td {
    border: none;
}
.TimeButtons:active {
      color: black;
}
</style>
<div class="actionPanel" 
    data-actionPanel-floating-div="true" data-actionPanel-orderId = "31713017" data-actionPanel-orderType="Standard" data-actionPanel-orderStatus="InProcess" data-actionPanel-nextOrderStatus="OutForDelivery"
    data-actionPanel-resId = "23175"   data-actionPanel-setOrderPrintingStatus-url = "/reshome/orders/SetOrderPrintingStatus"
    data-actionPanel-changeOrderStatus-url = "/reshome/orders/ChangeOrderStatus" data-actionPanel-contactTenBis-url = "/reshome/orders/SetResContact"
    data-selected-action="None">
    <div>
        <ul id="actions-legend">
                             <li>
                    <div class="actionLable">
                        <span class="actionLable">הדפס ואשר</span></div>
                    <div>
                        <img name="printAndConfirm"
                         data-actionpanel-action="printAndConfirm"     
                             src="/reshome/Content/Images/Print.gif" alt="הדפס ואשר"                             
                             data-actionPanel-orderId="31713017" data-actionPanel-orderType="Standard" 
                             data-actionPanel-orderStatus="InProcess" data-actionPanel-nextOrderStatus="OutForDelivery" 
                             data-actionPanel-setOrderPrintingStatus-url="/reshome/orders/SetOrderPrintingStatus"
                             data-actionPanel-changeOrderStatus-url="/reshome/orders/ChangeOrderStatus"
                             data-actionPanel-resId="23175"/>
                    </div>
                </li>
                                        <li>
                    <div class="actionLable">
                        <span class="actionLable"><label for="">הזמנה יצאה ללקוח</label></span></div>
                         <img name="confirm"
                            data-actionpanel-action="confirm"  
                         src="/reshome/Content/Images/OK.gif" alt="הזמנה יצאה ללקוח" 
                         data-actionPanel-changeOrderStatus-url="/reshome/orders/ChangeOrderStatus"
                         data-actionPanel-orderId="31713017" data-actionPanel-orderType="Standard" 
                         data-actionPanel-orderStatus="InProcess"
                         data-actionPanel-nextOrderStatus="OutForDelivery"
                         data-actionPanel-resId="23175"/>
                </li>
                    </ul>
    </div>
        <div class="actionLable actionLableFooter">
            הזמנה זו הודפסה ב - 26/03/2019 12:50:00
        </div>
    
</div>
<script type="text/javascript">

    $("div[data-actionPanel-floating-div='true']").ready(function () {
        if ($("div[data-actionPanel-floating-div='true']").length > 0) {
            var actionPanelDivObj = $("[data-actionPanel-floating-div='true']");

            window.onfocus = function () {
                $("[data-actionPanel-floating-div='true']").show();
            }

            if (actionPanelDivObj.size() > 0) {     
                var selectedAction = $(actionPanelDivObj).data("selected-action");

                switch(selectedAction){
                    case "PrintAll":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAll']").click();
                        break;
                    case "PrintNew":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printNew']").click();
                        break;
                    case "PrintAndConfirm":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAndConfirm']").click();
                        break;
                    case "PrintAndConfirmAndSetEstimatedTime":
                        $(actionPanelDivObj).find(" img[data-actionPanel-action='printAndConfirmAndSetEstimatedTime']").click();

                        break;
                    default:
                        break;
                }                               
            }

            $(document).bind("OrderConfirmed ContactedTenBis", function () {
                closeWindow();
            });
        }
    });    

    function closeWindow() {
        if(self.opener){
            window.open('', '_parent', '');
            self.opener.location.reload();
            self.close();
        }
        else { // mobile - the same window
            var witoutRefresh = false;
            back(witoutRefresh);
        }
    }

    function back(witoutRefresh) {
        if (witoutRefresh) {
            window.history.back();
        }
        else {
            window.location.href = document.referrer;
        }
    }
</script>

    <table class="OrderMainTableClass" align="center" border="0" dir="rtl">
        <tr>
            <td align = "center" >
                <table border="0" class="OrderHeaderTableClass">
                    <tr>
                        <td align = "center" >
                            <span  class="OrderHeaderClass">
                            הזמנת משלוח מתן ביס
                                  למסעדת
                                 עלמה פסטה וסלט</span>
                            <br/>
                            <span class="OrderNumberClass">
                                הזמנה מספר<span>: </span> 
                                3017
                            </span>
                <br/>
                <span class="OrderHeaderDesiredDeliveryTime">
                    הוזמן בשעה 12:47
                    <br />
זמן המשלוח<span>:</span>
ASAP</span><br />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td dir = "rtl" >
                <table class="OrderPaymentTableClass" dir="rtl" border="0" >
                    <tr>
                        <td colspan = "2" >
                <span class="OrderSectionHeaderClass">
                                תשלום:</span>&nbsp;&nbsp;
בהקפה דרך תן ביס<span>:</span>
₪ 38.00                        </td>
                    </tr>
                                        </table>
            </td>
        </tr>
        <tr>
            <td dir="rtl">
                <table id="OrderCustomerDetailsTable" border="0">
                    <tr>
                        <td colspan="4">
                    <span class="OrderSectionHeaderClass">
                                פרטי הלקוח:</span>&nbsp; 
                                <span class="OrderCustomerBoldClass">
                                    <span class="CustomerHighlightData">
                        ימית שלק;
                    </span>
חברה <span>:</span>
                        <span class="CustomerHighlightData">
                            Foresight Automotive
                        </span>
                        <span>;</span>
                טלפון<span>:</span>
-970826<span>;</span>
                טלפון 2<span>:</span>
0525136633<span>;</span>
                                                </span>
                        </td>
                    </tr>
                    <tr>
                        <td width="100%" valign="top">
                            <table border="0" width="100%">
                                <tbody class="" align="right">
                                        <tr>
                                            <td class="" width="10%">
                            כתובת:
                                            </td>
                                            <td class="" width="40%">
                            גולדה מאיר 7, נס ציונה. 
                                            </td>
                                            <td class="" width="10%">
                            חברה:
                                            </td>
                                            <td class="" width="40%">
                            Foresight Automotive
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="" width="10%">
                            כניסה:
                                            </td>
                                            <td class="" width="40%">
                            קומה 0
                                            </td>
                                            <td class="" width="10%">
                            קומה:
                                            </td>
                                            <td class="" width="40%">
                            0
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="" width="10%">
                            Zipcode:
                                            </td>
                                            <td class="" width="40%">
                            7403650
                                            </td>
                                            <td class="" width="10%">
                            טלפון:
                                            </td>
                                            <td class="" width="40%">
                            077-9709030
                                            </td>
                                        </tr>
                                                                    </tbody>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
        <tr>
            <td dir="rtl">
                <table id="OrderItemsTable" class="OrderItemsTableClass" width="" border="0">
                    <tr>
                        <td colspan="3" class="OrderSectionHeaderClass">
                פרטי ההזמנה
                        </td>
                    </tr>

                    <tr>
                        <td width="85%">פריט
                        </td>
                        <td width="5%">כמות
                        </td>
                        <td width="10%">מחיר
                        </td>
                    </tr>
                                    <tr>
                            <td height="100%" class="OrderDishRow">
                                <span class="OrderDishNameClass">
                                    העסקיות של עלמה
                                    >>
                                    עסקית פשטידת קיש + סלט אישי - חדש!!
                                </span>
 <span class="OrderDishDescClass">
                                    עסקית פשטידת קיש לבחירה, וסלט ירקות אישי
עם רוטב לבחירה; </span>
                                                                <br /> 
בחר/י את הסלט האישי (500 מ&quot;ל)                                            <span class="OrderItemsSubDescClass">
                                        סלט ירקות- חסה, עגבניה, מלפפון, גזר ופטרוזיליה  </span>
                                                <span>.</span>
                                    <br /> 
סוג פשטידת קיש לבחירה                                            <span class="OrderItemsSubDescClass">
                                        קיש פטריות </span>
                                                <span>.</span>
                                    <br /> 
הרוטב לסלט:                                             <span class="OrderItemsSubDescClass">
                                        ויניגרט </span>
                                                <span>.</span>
                                                                <br />
<label for="dish_Remarks">הערות מיוחדות:</label>                                    <span></span>
Guest 1                                        <span>.</span>
                                        <span class="OrderDishRemarksClass">
                                        עבור שלמה הלל</span>
                                        <span>.</span>
                            </td>
                                <td class="OrderSingleDishClass">
                                    1<span> x</span>
                                </td>
                            <td height="100%" valign="middle">
                            <span>₪40.00</span>
                            </td>
                        </tr>
                                    <tr>
                            <td colspan="2">
                            5% הנחה ע&quot;ח המסעדה
                            </td>
                            <td>
                            ₪-2.00
                            </td>
                        </tr>
                    <tr id="OrderTotalPriceTR">
                        <td colspan="2">
                    סה&quot;כ לתשלום
                        </td>
                        <td>
                        <span>₪38.00</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <center>
        <span class="OrderNumberClass">
            סוף הזמנה מספר:
            3017
        </span>
    </center>
        <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-235558-2']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>


    <script>
        $("#backButton").click(function () {
            var withoutRefresh = $(this).data("without-refresh");
            back(withoutRefresh);
        });
    </script>

</body>
</html>
`;

const ParseService = require('./services/parse');
ParseService.mapPooledHtmlOrderToOrder(pooledHtmlOrder);