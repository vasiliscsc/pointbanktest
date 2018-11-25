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

export async function do_action(input) {
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
