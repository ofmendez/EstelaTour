document.addEventListener("DOMContentLoaded", () => {
  const tourDates = [
    {
      date: "2026-05-02",
      event: "FESTIVAL LA SOLAR",
      city: "MEDELLÍN,",
      country: "COLOMBIA",
      ticketUrl: "https://web.tuboleta.com/images/Eventos/La-Solar-2026/home.html",
      soldOut: true,
      isNew: false
    },

    {
      date: "2026-06-27",
      event: "MAMACITA SOUND FESTIVAL",
      city: "PARÍS,",
      country: "FRANCIA",
      ticketUrl: "https://shotgun.live/es/festivals/mamacita-sound-2026",
      soldOut: true,
      isNew: true
    },
    {
      date: "2026-07-03",
      event: "KOKO",
      city: "LONDRÉS,",
      country: "INGLATERRA",
      ticketUrl: "https://koko.seetickets.com/event/mora/koko/3640461?utm_source=website&utm_medium=event&utm_term=Mora",
      soldOut: false,
      isNew: true
    },

    {
      date: "2026-07-04",
      event: "LATINO GANG",
      city: "DEN HAAG,",
      country: "PAISES BAJOS",
      ticketUrl: "https://latinogang.nl/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQz4VxleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAae1PPj0LVeSuDiOOOPgjkS-YkJAtHugWwURQi-OtRGa8zvMR3Fd80NdvFJ6yw_aem_PnhjKqTOkiLg-NBGrZdNQw",
      soldOut: false,
      isNew: false
    },
    {
      date: "2026-07-05",
      event: "LATIN FEST",
      city: "BENIDORM,",
      country: "ESPAÑA",
      ticketUrl: "https://latinfest.janto.es/",
      soldOut: false,
      isNew: false
    },

    {
      date: "2026-07-09",
      event: "MILANO LATIN FESTIVAL",
      city: "MILÁN,",
      country: "ITALIA",
      ticketUrl: "https://www.ticketone.it/event/milano-latin-festival-mind-live-theatre-20985043/",
      soldOut: false,
      isNew: true
    },

    {
      date: "2026-07-12",
      event: "ICÓNICA",
      city: "SEVILLA,",
      country: "ESPAÑA",
      ticketUrl: "https://iconicafest.com/mora/",
      soldOut: false,
      isNew: false
    },
    {
      date: "2026-07-17",
      event: "STARLITE",
      city: "MARBELLA,",
      country: "ESPAÑA",
      ticketUrl: "https://entradas.starlitemarbella.com/event/mora-9q2o51?cookie_consent=performance%2Cmarketing&_gl=1*pipdxs*_ga*ODQwOTg3MjQ0LjE3NzQ2NDk5OTk.*_ga_L1HKW5P9TY*czE3NzQ2NDk5OTgkbzEkZzAkdDE3NzQ2NDk5OTgkajYwJGwwJGgw",
      soldOut: false,
      isNew: false
    },
    {
      date: "2026-07-18",
      event: "LATIN FEST",
      city: "VALENCIA,",
      country: "ESPAÑA",
      ticketUrl: "https://latinfest.es/valencia/entradas",
      soldOut: false,
      isNew: false
    }
  ];

  const assets = {
    tickets: "assets/boletos.webp",
    ticketsNew: "assets/boletos-new.webp",
    comingSoon: "assets/coming-soon.svg",
    comingSoonNew: "assets/coming-soon-new.svg",
    soldOut: "assets/sold-out.svg"
  };

  const monthsEs = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ];

  const list = document.getElementById("tourDatesList");

  if (!list) return;

  const sortedDates = [...tourDates].sort((a, b) => {
    return new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`);
  });

  function formatDisplayDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const monthName = monthsEs[month - 1];
    return `${monthName} ${day}`;
  }

  function getButtonData(item) {
    if (item.soldOut) {
      return {
        src: assets.soldOut,
        alt: "Sold out",
        href: null
      };
    }

    if (item.ticketUrl) {
      return {
        src: item.isNew ? assets.ticketsNew : assets.tickets,
        alt: item.isNew ? "Boletos nuevo" : "Boletos",
        href: item.ticketUrl
      };
    }

    return {
      src: item.isNew ? assets.comingSoonNew : assets.comingSoon,
      alt: item.isNew ? "Coming soon nuevo" : "Coming soon",
      href: null
    };
  }

  function createButtonMarkup(item) {
    const button = getButtonData(item);

    if (button.href) {
      return `
        <a class="tour-date__button-link" href="${button.href}" target="_blank" rel="noopener" aria-label="${button.alt}">
          <img src="${button.src}" alt="${button.alt}">
        </a>
      `;
    }

    return `
      <span class="tour-date__button-disabled" aria-label="${button.alt}">
        <img src="${button.src}" alt="${button.alt}">
      </span>
    `;
  }

  function createRowMarkup(item) {
    return `
      <article class="tour-date ${item.soldOut ? "tour-date--sold-out" : ""}">
        <div class="tour-date__date">${formatDisplayDate(item.date)}</div>
        <div class="tour-date__event">${item.event}</div>
        <div class="tour-date__city">${item.city}</div>
        <div class="tour-date__country">${item.country}</div>
        <div class="tour-date__button">
          ${createButtonMarkup(item)}
        </div>
      </article>
    `;
  }

  list.innerHTML = sortedDates.map(createRowMarkup).join("");
});
