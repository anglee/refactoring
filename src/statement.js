function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  const performances = invoice.performances.map(performance => {
    const perf = { ...performance };
    perf.play = playFor(perf);
    perf.amount = amountFor(perf);
    perf.volumeCredits = volumeCreditsFor(perf);
    return perf;
  });
  statementData.performances = performances;
  statementData.totalAmount = totalAmount(performances);
  statementData.totalVolumeCredits = totalVolumeCredits(performances);

  return renderPlainText(statementData);

  //============================================================================
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let volumeCredits = 0;

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    // add extra credit for every ten comedy attendees
    if ("comedy" === perf.play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    return volumeCredits;
  }

  function totalAmount(performances) {
    let totalAmount = 0;
    for (let perf of performances) {
      totalAmount += perf.amount;
    }
    return totalAmount;
  }

  function totalVolumeCredits(performances) {
    let volumeCredits = 0;
    for (let perf of performances) {
      volumeCredits += perf.volumeCredits;
    }
    return volumeCredits;
  }
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;

  return result;

  //============================================================================

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber);
  }
}

module.exports = statement;
