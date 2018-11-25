"use strict";
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyCmexHyv4f7A9kRdz0a_KEKuFHCIDDFXYk",
    authDomain: "newagent-544b5.firebaseapp.com",
    databaseURL: "https://newagent-544b5.firebaseio.com",
    projectId: "newagent-544b5",
    storageBucket: "newagent-544b5.appspot.com",
    messagingSenderId: "693588300138"
};

exports.hello = function(){
  return "Hello";
}


firebase.initializeApp(config);
var database = firebase.database();
//var dataStore = firebase.storage();
//var managerID=getManagerID("Cbbb","c3");

//addCustomer("Xristos","RLSB101010");
//removeCustomer("Cddd");
//removeManager("Mbbb")
//addManager("Mccc","RLSB101010");
//addAccount("Xristos","Mccc","c6");
getRailsBankFromID("Vasilis");

isCustomer("5bf956f7-909e-4f6a-bfe0-bd2a7b4dc262",function() {
  console.log("true");
}, function() {
  console.log("false");
});

/*var dbRef=database.ref('Customers/kqwheqiwejqiwejq/');


    var countRef=dbRef.once('value').then(function(snapshot){
        console.log(snapshot.val());
    });
var dbRef=database.ref('Customers/');


    var countRef=dbRef.once('value').then(function(snapshot){
        console.log(snapshot.val()["kqwheqiwejqiwejq"]["managers"]["<accountID>"]);
    });*/

function addTransaction(customerID,date,amount,description,receiptImage){
    var file = Blob()

    }

function addAccount(customerID, managerID, accountID){
    var allCustomersRef = database.ref('Customers/')
    allCustomersRef.once('value').then(function(snapshot){
        var allCustomers = snapshot.val()
        var index = getCustomerDBID(allCustomers, customerID)



        var allCustomersRef = database.ref('Customers/')
        allCustomersRef.once('value').then(function(snapshot){
            var newInd=Object.keys(snapshot.val()).length-1;
            database.ref('Customers/'+index+'/Accounts/'+newInd).set({
                ID: accountID
            });
        });

        //var newIndex = database.ref('Customers/'+index+'Accounts/').push().key;


    });

    var allManagersRef = database.ref('Managers/')
    allManagersRef.once('value').then(function(snapshot){

        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==managerID)
            {

                var manager = allManagers[i]
                if(manager['Accounts']==null)
                {
                    database.ref('Managers/'+i+'/Accounts/0').set({
                        ID: accountID
                    });
                }
                else
                {
                    var accounts = manager['Accounts']
                    var accountsCount = Object.keys(accounts).length

                    for(var j=0;j<accountsCount;j++)
                    {
                        if(accounts[j]['ID']==accountID){
                            return
                        }
                    }

                    var newInd=accountsCount-1;
                    database.ref('Managers/'+i+'/Accounts/'+newInd).set({
                        ID: accountID
                    });
                }


            }
        }
        //        var newInd=Object.keys(snapshot.val()).length-1;
        //        database.ref('Customers/'+index+'/Accounts/'+newInd).set({
        //            ID: accountID
        //        });
    });
}

function getCustomerDBID(allCustomers,customerID){
    for(var i=0;i<Object.keys(allCustomers).length;i++)
    {
        if(allCustomers[i]['ID']==customerID)
        {
            return i;
        }
    }
}

function isCustomer(entityID,onSuccess,onFailure){
    var allManagersRef = database.ref('Managers/');
    allManagersRef.once('value').then(function(snapshot){
      var allManagers = snapshot.val();
      for(var i=0;i<Object.keys(allManagers).length;i++)
      {
        // console.log(allManagers[i]);
        if(allManagers[i]['ID']==entityID)
        {
          onFailure()
          // console.log("in");
            return false;
        }
      }
      onSuccess()
      // console.log("out");
      return true;
    })
}


function getRailsBankFromID(ID){

    var allManagersRef = database.ref('Managers/')
    allManagersRef.once('value').then(function(snapshot){

        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==ID)
            {
                console.log(allManagers[i]['RailsBankID']);
                return allManagers[i]['RailsBankID'];
            }
        }
    });


    var allCustomersRef = database.ref('Customers/')
    allCustomersRef.once('value').then(function(snapshot){

        var allCustomers = snapshot.val()
        for(var i=0;i<Object.keys(allCustomers).length;i++)
        {
            if(allCustomers[i]['ID']==ID)
            {
                return allCustomers[i]['RailsBankID'];
            }
        }
    });
}


function addCustomer(customerID,RailsBankID)
{
    var allCustomersRef = database.ref('Customers/')

    allCustomersRef.once('value').then(function(snapshot){
        var customerCount=Object.keys(snapshot.val()).length

        database.ref('Customers/'+customerCount).set({
            ID: customerID,
            RailsBankID: RailsBankID
        });
    });
}

function removeCustomer(customerID)
{
    var allCustomersRef = database.ref('Customers/')

    allCustomersRef.once('value').then(function(snapshot){
        var allCustomers = snapshot.val()
        for(var i=0;i<Object.keys(allCustomers).length;i++)
        {
            if(allCustomers[i]['ID']==customerID)
            {
                database.ref('Customers/'+i).remove();
            }
        }
    });

}

function addManager(managerID,RailsBankID)
{
    var allManagersRef = database.ref('Managers/')

    allManagersRef.once('value').then(function(snapshot){
        var managerCount=Object.keys(snapshot.val()).length

        database.ref('Managers/'+managerCount).set({
            ID: managerID,
            RailsBankID: RailsBankID
        });
    });
}

function removeManager(managerID)
{
    var allManagersRef = database.ref('Managers/')

    allManagersRef.once('value').then(function(snapshot){
        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==managerID)
            {
                database.ref('Managers/'+i).remove();
            }
        }
    });

}


function getManagerID(customerID,accountID)
{

    var dbRef=database.ref('Managers/');


    var countRef=dbRef.once('value').then(function(snapshot){
        var managerID=getManager(snapshot.val(),accountID);
        //var customerObject=getCustomer(snapshot.val(),customerID);
        //var arrayOfaccountIDs=getAccounts(customerObject);
        //console.log(arrayOfaccountIDs);
        console.log(managerID);
        return managerID;
    });

}

function getAccounts(user)
{
    var accountID = new Array();
    for(var j=0;j<Object.keys(user['Accounts']).length;j++)
    {
        accountID.push(user['Accounts'][j]['ID']);
    }
    return accountID;
}

function getCustomer(allCustomers,customerID)
{

    for(var i=0;i<Object.keys(allCustomers).length;i++)
    {
        console.log(allCustomers[i]['ID']);
        if(allCustomers[i]['ID']==customerID)
        {
            return allCustomers[i];
        }
        //var arrayOfaccountIDs=getAccounts(allCustomers[i]);
        //console.log(arrayOfaccountIDs);
    }
}

function getManager(allManagers,accountID)
{

    for(var i=0;i<Object.keys(allManagers).length;i++)
    {
        //console.log(allManagers[i]);
        //console.log(i);

        for(var j=0;j<Object.keys(allManagers[i]['Accounts']).length;j++)
        {
            //console.log(allManagers[i]['Accounts'][j]['ID']);
            //console.log(j);
            if(allManagers[i]['Accounts'][j]['ID']==accountID)
            {
                return allManagers[i]['ID'];
            }
        }
    }
}







/*var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAOY-PIOLx5ITkdKXWZFUMfvK9Nf7gVCeI",
    authDomain: "pointbank-a778f.firebaseapp.com",
    databaseURL: "https://pointbank-a778f.firebaseio.com",
    projectId: "pointbank-a778f",
    storageBucket: "pointbank-a778f.appspot.com",
    messagingSenderId: "69974187061"
};

    firebase.initializeApp(config);




function start()
{
    document.getElementById('demo').innerHTML = "Page is loaded";

    document.getElementById('demo').innerHTML = "Config done";
}

function date()
{
    document.getElementById('demo').innerHTML = Date();
    var dbRef=database.ref('Customers/Customer1/customerid');


    var countRef=dbRef.once('value').then(function(snapshot)
                                                                          {
        document.getElementById('demo').innerHTML = snapshot.val();
    });
}



function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}*/


// const myModule = require('./func');
// var hihi = myModule.hello();
// console.log(hihi);

var fetch = require("node-fetch");

var enduser_id = "5bf95655-b89b-44e0-ba12-58cc98ee0716";
var base_url = "https://playlive.railsbank.com";
var customer_api_key = "4ikivesq4ypr0g3kx4klqkl1r503qt33#67h7t1v76kjea6j88ol2q8rwcfk8wekdiubdjaw2ziwqnd9pwquq219fyagx4zv3";
var card_id = "5bfa5697-5dfe-4058-8da0-ada21c79ee12";
var rule_id = "5bfa1060-22ae-456b-940c-45e7301b05a6";
var ledger_id = "5bf957aa-d641-4851-8093-f415a941c0a8";


// myObject = {};
// myObject['result']={};
// myObject['result']['action']="cardRule";
// myObject['result']['parameters']={};
// myObject['result']['parameters']['date']="25/11/2018";
// myObject['result']['parameters']['date1']="23/11/2018";
// myObject['result']['parameters']['date2']="30/11/2018";


// do_action(myObject);

function convertDate(date) {
  var year = date.substring(0,4);
  var month = date.substring(5,7);
  var day = date.substring(8,10);
  var hour = date.substring(11,13);
  var minute = date.substring(14,16);
  var second = date.substring(17,19);

  return "on "+day+"/"+month+"/"+year+" at "+hour+":"+minute+":"+second;
}

async function do_action(input) {
    var action = input['result']['action'];
    switch (action){
    case "login":
      //
    break;
    case "fetchTransactionAtDate":
      var date = input['result']['parameters']['date'];
      console.log(await fetch_transactions_at_date(date));
    break;
    case "DefaultWelcomeIntent.CardBalance":
      return await fetch_balances_of_enduser(input);
    break;
    case "netTransactions":
      var date1 = input['result']['parameters']['date1'];
      var date2 = input['result']['parameters']['date2'];
      console.log(await net_sum_of_transactions_between_two_dates(date1,date2));
    break;
    case "activateCard":
      console.log(await activate_debit_card(card_id));
      break;
    case "freezeCard":
      console.log(await freeze_debit_card(card_id));
      break;
    case "cardRule":
      console.log(await ask_spending_limits(rule_id));
      break;
    default:
      console.log("What the rubberduck are you talking about");
    break;
    // if(action == "fetchTransactionAtDate"){
    //   console.log(await fetch_transactions_at_date(input));
    // }
    }
}


async function fetch_all_transactions_of_enduser() {
    var list_of_ledgers = await list_a_specific_endusers_ledgers(enduser_id);
    var all_customer_transactions = await get_all_customer_transactions();
    var transactions = [];


    for (var i = 0 ; i < Object.keys(all_customer_transactions).length ; i++){

      if (all_customer_transactions[i]['transaction_type'] == "transaction-type-receive") {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_to_id'])>=0){
          transaction = {};
          transaction['amount']=all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['date'] = convertDate(all_customer_transactions[i]['payment_info']['receivedAt']);
          transactions.push(transaction);
        }
      } else if (all_customer_transactions[i]['transaction_type'] == "transaction-type-send") {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_from_id'])>=0){
          transaction = {};
          transaction['amount']="-" + all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=all_customer_transactions[i]['payment_info']['sourceAccount'];
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
      } else {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_from_id'])>=0){
          transaction = {};
          transaction['amount']="-" + all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=await fetch_name_from_ledger(all_customer_transactions[i]['ledger_to_id']);
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_to_id'])>=0){
          transaction = {};
          transaction['amount']=all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=await fetch_name_from_ledger(all_customer_transactions[i]['ledger_from_id']);
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
      }
    }

    return transactions;

}

async function fetch_transactions_at_date(date){


  transactions = await fetch_all_transactions_of_enduser();

  output = [];
  for (var i=0; i<transactions.length; i++){
    if (transactions[i]['date'].substring(3,13)==date){
      output.push(transactions[i]);
    }
  }
  return output;
}

async function list_a_specific_endusers_ledgers(enduser_id){

  const output = await fetch(base_url+"/v1/customer/endusers/"+enduser_id,
    {
      method :'get',
      headers :{
        "Content-Type" : "application/json",
        "Accept": "application/json",
        "Authorization": "API-Key "+ customer_api_key,
        "cache-control": "no-cache"
      }
    }).then(response => response.json());
    var results = [];
    for (var i = 0 ; i < Object.keys(output['ledgers']).length ; i++){
      results.push(output['ledgers'][Object.keys(output['ledgers'])[i]]['ledger_id']);
    }

    return results;
}

async function get_all_customer_transactions(){
  const output = await fetch(base_url+"/v1/customer/transactions",
    {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'API-Key '+customer_api_key
      }
    }).then(response => response.json());
    return output;
}

async function fetch_name_from_ledger(ledger_id){
  const output = await fetch(base_url+"/v1/customer/ledgers/"+ledger_id,
  {
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "cache-control": "no-cache",
    }
  }).then(response => response.json());
  if(output['ledger_holder'].hasOwnProperty('person')){
    return output['ledger_holder']['person']['name'];
  }
  else{
    return output['ledger_holder']['company']['name'];
  }
}


async function fetch_balances_of_enduser(){

  var results = []
  var list_of_ledgers = await list_a_specific_endusers_ledgers(enduser_id);

  for (var i = 0 ; i < list_of_ledgers.length ; i++){
    const output = await fetch(base_url+"/v1/customer/ledgers/"+list_of_ledgers[i],
    {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Authorization": "API-Key "+customer_api_key,
        "cache-control": "no-cache",
      }
    }).then(response => response.json());
    results.push("Account " + (i+1) + ": " +output['amount']);
  }
  return results;
}



function getDateArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    for(var i = 0 ; i < arr.length ; i++){
      arr[i] = arr[i].toLocaleDateString();
      var mm = arr[i].substring(0,2);
      var dd = arr[i].substring(3,5);
      var yyyy = arr[i].substring(6,11);
      arr[i] = dd+"/"+mm+"/"+yyyy;
    }
    return arr;
}


async function transactions_between_two_dates(start,end){
    var mm = start.substring(0,2);
    var dd = start.substring(3,5);
    var yyyy = start.substring(6,11);
    start = dd+"/"+mm+"/"+yyyy;
    mm = end.substring(0,2);
    dd = end.substring(3,5);
    yyyy = end.substring(6,11);
    end = dd+"/"+mm+"/"+yyyy;

  var startDate = new Date(start); //YYYY-MM-DD
  var endDate = new Date(end); //YYYY-MM-DD
  var dateArr = getDateArray(startDate, endDate);
  var output = [];
  for (var i = 0 ; i < dateArr.length ; i++){
    output.push (await fetch_transactions_at_date(dateArr[i]));
  }
  return output;
}


async function net_sum_of_transactions_between_two_dates(start,end){
  var to_sum = 0;
  var array_of_transactions_per_day = await transactions_between_two_dates (start,end);
  for (var i = 0 ; i < array_of_transactions_per_day.length ; i++){
      for (var j = 0 ; j < array_of_transactions_per_day[i].length ; j++){
        to_sum = to_sum + parseFloat(array_of_transactions_per_day[i][j]['amount'],10);
      }
    }
  return parseFloat(to_sum).toFixed(2);
}


async function activate_debit_card(card_id){
  const output = await fetch(base_url+"/v1/customer/cards/"+card_id+"/activate",
  {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return ("Activated Card!\n" + output);
}


async function freeze_debit_card(card_id){
  const output = await fetch(base_url+"/v1/customer/cards/"+card_id+"/suspend",
  {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return ("Froze Card!\n" + output);
}


async function ask_spending_limits(rule_id){
  const output = await fetch(base_url+"/v1/customer/cards/rules/"+rule_id,
  {
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
    }
  }).then(response => response.json());
  return (output['card_rule_description']);
}


//TODO make it check if manager
async function add_card(ledger_id){
  const output = await fetch(base_url+"/v1/customer/cards",
  {
    body:{
      "card_programme": "openbankhack18",
      "ledger_id": "5bf957aa-d641-4851-8093-f415a941c0a8",
      "partner_product": "Railsbank-Debit-Card-1",
      "card_rules": ["5bfa1060-22ae-456b-940c-45e7301b05a6"]
    },
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return (output['card_rule_description']);
}


const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/action", function(req, res) {
  // const result = await webhook.do_action(req);
  var speech = 
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "point-bank-bot"
  });
});
//test CI-CD


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
// const myModule = require('./func');
// var hihi = myModule.hello();
// console.log(hihi);

var fetch = require("node-fetch");

var enduser_id = "5bf95655-b89b-44e0-ba12-58cc98ee0716";
var base_url = "https://playlive.railsbank.com";
var customer_api_key = "4ikivesq4ypr0g3kx4klqkl1r503qt33#67h7t1v76kjea6j88ol2q8rwcfk8wekdiubdjaw2ziwqnd9pwquq219fyagx4zv3";
var card_id = "5bfa5697-5dfe-4058-8da0-ada21c79ee12";
var rule_id = "5bfa1060-22ae-456b-940c-45e7301b05a6";
var ledger_id = "5bf957aa-d641-4851-8093-f415a941c0a8";


// myObject = {};
// myObject['result']={};
// myObject['result']['action']="cardRule";
// myObject['result']['parameters']={};
// myObject['result']['parameters']['date']="25/11/2018";
// myObject['result']['parameters']['date1']="23/11/2018";
// myObject['result']['parameters']['date2']="30/11/2018";


// do_action(myObject);

function convertDate(date) {
  var year = date.substring(0,4);
  var month = date.substring(5,7);
  var day = date.substring(8,10);
  var hour = date.substring(11,13);
  var minute = date.substring(14,16);
  var second = date.substring(17,19);

  return "on "+day+"/"+month+"/"+year+" at "+hour+":"+minute+":"+second;
}

async function do_action(input) {
    var action = input['result']['action'];
    switch (action){
    case "login":
      //
    break;
    case "fetchTransactionAtDate":
      var date = input['result']['parameters']['date'];
      console.log(await fetch_transactions_at_date(date));
    break;
    case "DefaultWelcomeIntent.CardBalance":
      return await fetch_balances_of_enduser(input);
    break;
    case "netTransactions":
      var date1 = input['result']['parameters']['date1'];
      var date2 = input['result']['parameters']['date2'];
      console.log(await net_sum_of_transactions_between_two_dates(date1,date2));
    break;
    case "activateCard":
      console.log(await activate_debit_card(card_id));
      break;
    case "freezeCard":
      console.log(await freeze_debit_card(card_id));
      break;
    case "cardRule":
      console.log(await ask_spending_limits(rule_id));
      break;
    default:
      console.log("What the rubberduck are you talking about");
    break;
    // if(action == "fetchTransactionAtDate"){
    //   console.log(await fetch_transactions_at_date(input));
    // }
    }
}


async function fetch_all_transactions_of_enduser() {
    var list_of_ledgers = await list_a_specific_endusers_ledgers(enduser_id);
    var all_customer_transactions = await get_all_customer_transactions();
    var transactions = [];


    for (var i = 0 ; i < Object.keys(all_customer_transactions).length ; i++){

      if (all_customer_transactions[i]['transaction_type'] == "transaction-type-receive") {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_to_id'])>=0){
          transaction = {};
          transaction['amount']=all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['date'] = convertDate(all_customer_transactions[i]['payment_info']['receivedAt']);
          transactions.push(transaction);
        }
      } else if (all_customer_transactions[i]['transaction_type'] == "transaction-type-send") {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_from_id'])>=0){
          transaction = {};
          transaction['amount']="-" + all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=all_customer_transactions[i]['payment_info']['sourceAccount'];
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
      } else {
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_from_id'])>=0){
          transaction = {};
          transaction['amount']="-" + all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=await fetch_name_from_ledger(all_customer_transactions[i]['ledger_to_id']);
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
        if (list_of_ledgers.indexOf(all_customer_transactions[i]['ledger_to_id'])>=0){
          transaction = {};
          transaction['amount']=all_customer_transactions[i]['amount'];
          transaction['reference']=all_customer_transactions[i]['reference'];
          transaction['information']=await fetch_name_from_ledger(all_customer_transactions[i]['ledger_from_id']);
          transaction['date']=convertDate(all_customer_transactions[i]['created_at']);
          transactions.push(transaction);
        }
      }
    }

    return transactions;

}

async function fetch_transactions_at_date(date){


  transactions = await fetch_all_transactions_of_enduser();

  output = [];
  for (var i=0; i<transactions.length; i++){
    if (transactions[i]['date'].substring(3,13)==date){
      output.push(transactions[i]);
    }
  }
  return output;
}

async function list_a_specific_endusers_ledgers(enduser_id){

  const output = await fetch(base_url+"/v1/customer/endusers/"+enduser_id,
    {
      method :'get',
      headers :{
        "Content-Type" : "application/json",
        "Accept": "application/json",
        "Authorization": "API-Key "+ customer_api_key,
        "cache-control": "no-cache"
      }
    }).then(response => response.json());
    var results = [];
    for (var i = 0 ; i < Object.keys(output['ledgers']).length ; i++){
      results.push(output['ledgers'][Object.keys(output['ledgers'])[i]]['ledger_id']);
    }

    return results;
}

async function get_all_customer_transactions(){
  const output = await fetch(base_url+"/v1/customer/transactions",
    {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'API-Key '+customer_api_key
      }
    }).then(response => response.json());
    return output;
}

async function fetch_name_from_ledger(ledger_id){
  const output = await fetch(base_url+"/v1/customer/ledgers/"+ledger_id,
  {
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "cache-control": "no-cache",
    }
  }).then(response => response.json());
  if(output['ledger_holder'].hasOwnProperty('person')){
    return output['ledger_holder']['person']['name'];
  }
  else{
    return output['ledger_holder']['company']['name'];
  }
}


async function fetch_balances_of_enduser(){

  var results = []
  var list_of_ledgers = await list_a_specific_endusers_ledgers(enduser_id);

  for (var i = 0 ; i < list_of_ledgers.length ; i++){
    const output = await fetch(base_url+"/v1/customer/ledgers/"+list_of_ledgers[i],
    {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Authorization": "API-Key "+customer_api_key,
        "cache-control": "no-cache",
      }
    }).then(response => response.json());
    results.push("Account " + (i+1) + ": " +output['amount']);
  }
  return results;
}



function getDateArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    for(var i = 0 ; i < arr.length ; i++){
      arr[i] = arr[i].toLocaleDateString();
      var mm = arr[i].substring(0,2);
      var dd = arr[i].substring(3,5);
      var yyyy = arr[i].substring(6,11);
      arr[i] = dd+"/"+mm+"/"+yyyy;
    }
    return arr;
}


async function transactions_between_two_dates(start,end){
    var mm = start.substring(0,2);
    var dd = start.substring(3,5);
    var yyyy = start.substring(6,11);
    start = dd+"/"+mm+"/"+yyyy;
    mm = end.substring(0,2);
    dd = end.substring(3,5);
    yyyy = end.substring(6,11);
    end = dd+"/"+mm+"/"+yyyy;

  var startDate = new Date(start); //YYYY-MM-DD
  var endDate = new Date(end); //YYYY-MM-DD
  var dateArr = getDateArray(startDate, endDate);
  var output = [];
  for (var i = 0 ; i < dateArr.length ; i++){
    output.push (await fetch_transactions_at_date(dateArr[i]));
  }
  return output;
}


async function net_sum_of_transactions_between_two_dates(start,end){
  var to_sum = 0;
  var array_of_transactions_per_day = await transactions_between_two_dates (start,end);
  for (var i = 0 ; i < array_of_transactions_per_day.length ; i++){
      for (var j = 0 ; j < array_of_transactions_per_day[i].length ; j++){
        to_sum = to_sum + parseFloat(array_of_transactions_per_day[i][j]['amount'],10);
      }
    }
  return parseFloat(to_sum).toFixed(2);
}


async function activate_debit_card(card_id){
  const output = await fetch(base_url+"/v1/customer/cards/"+card_id+"/activate",
  {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return ("Activated Card!\n" + output);
}


async function freeze_debit_card(card_id){
  const output = await fetch(base_url+"/v1/customer/cards/"+card_id+"/suspend",
  {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return ("Froze Card!\n" + output);
}


async function ask_spending_limits(rule_id){
  const output = await fetch(base_url+"/v1/customer/cards/rules/"+rule_id,
  {
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
    }
  }).then(response => response.json());
  return (output['card_rule_description']);
}


//TODO make it check if manager
async function add_card(ledger_id){
  const output = await fetch(base_url+"/v1/customer/cards",
  {
    body:{
      "card_programme": "openbankhack18",
      "ledger_id": "5bf957aa-d641-4851-8093-f415a941c0a8",
      "partner_product": "Railsbank-Debit-Card-1",
      "card_rules": ["5bfa1060-22ae-456b-940c-45e7301b05a6"]
    },
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Authorization": "API-Key "+customer_api_key,
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
  return (output['card_rule_description']);
}

