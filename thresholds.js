// Ringing Tracker: BTO licence endorsement thresholds, by species group.
// Source: BTO minimum thresholds tables (Ringing_thresholds.xlsx).
//
// Used by dashboard.html's "Licence thresholds" section. Only the Full-grown endorsement is
// wired up on the dashboard so far — the Pullus, Mist net and Whoosh net entries below are kept
// in the same shape ready for when those tabs are built, but are not yet read by dashboard.html.
//
// Each endorsement has a list of species "groups". For Full-grown, a group's `categories` is the
// list of species.js categories (OPEN/CAV/PREY/WADE/WATER/COL/CLIFF/HERON) that count towards it —
// written out as the literal strings from species.js so this file has no load-order dependency
// on species.js. Full-grown treats open- and cavity-nesting passerines as a single group; the
// Pullus endorsement (once wired up) will split them, which is why `categories` is a list rather
// than a single value.
//
// `unrestricted` is the "N individuals of M species" unrestricted-endorsement requirement.
// `restricted` is the per-species individuals needed to add that species to a restricted
// endorsement: `first` for the first species added, `additional` for every species after that.
//
// After editing, figures should be cross-checked against the latest BTO ringers' manual /
// endorsement guidance, since thresholds can change between revisions.

(function () {
  var FULLGROWN_GROUPS = [
    {
      key: 'passerines',
      name: 'Passerines & near-passerines',
      categories: [
        'Open-nesting passerines and near-passerines',
        'Cavity-nesting passerines and near-passerines'
      ],
      independentAssessment: false,
      unrestricted: { individuals: 100, species: 9 },
      restricted:   { first: 20, additional: 10 }
    },
    {
      key: 'prey',
      name: 'Birds of prey',
      categories: ['Birds of prey'],
      independentAssessment: false,
      unrestricted: { individuals: 25, species: 4 },
      restricted:   { first: 10, additional: 5 }
    },
    {
      key: 'waders',
      name: 'Waders & gamebirds',
      categories: ['Waders and gamebirds'],
      independentAssessment: false,
      unrestricted: { individuals: 47, species: 5 },
      restricted:   { first: 15, additional: 8 }
    },
    {
      key: 'waterfowl',
      name: 'Waterfowl',
      categories: ['Waterfowl'],
      independentAssessment: false,
      unrestricted: { individuals: 50, species: 6 },
      restricted:   { first: 15, additional: 7 }
    },
    {
      key: 'colony',
      name: 'Colony-nesting seabirds',
      categories: ['Colony-nesting seabirds'],
      independentAssessment: false,
      unrestricted: { individuals: 50, species: 4 },
      restricted:   { first: 20, additional: 10 }
    },
    {
      key: 'cliff',
      name: 'Cliff-nesting seabirds',
      categories: ['Cliff-nesting seabirds'],
      independentAssessment: false,
      unrestricted: { individuals: 20, species: 2 },
      restricted:   { first: 10, additional: 10 }
    },
    {
      key: 'herons',
      name: 'Herons & egrets',
      categories: ['Herons and egrets'],
      independentAssessment: false,
      unrestricted: { individuals: 10, species: 2 },
      restricted:   { first: 5, additional: 5 }
    }
  ];

  // Pullus and mist/whoosh-net groups are recorded here for completeness (and so the
  // Full-grown shape above can be followed exactly when they're built) but dashboard.html
  // does not read them yet.
  var PULLUS_GROUPS = [
    {
      key: 'passerines-open',
      name: 'Passerines & near-passerines (open nesting)',
      categories: ['Open-nesting passerines and near-passerines'],
      independentAssessment: false,
      unrestricted: { individuals: 50, species: 6 },
      broodAssessments: 40,
      restricted: { first: 20, firstBroods: 10, additional: 6, additionalBroods: 6 }
    },
    {
      key: 'passerines-cavity',
      name: 'Passerines & near-passerines (cavity nesting)',
      categories: ['Cavity-nesting passerines and near-passerines'],
      independentAssessment: false,
      unrestricted: { individuals: 30, species: 4 },
      broodAssessments: 25,
      restricted: { first: 15, firstBroods: 10, additional: 5, additionalBroods: 5 }
    },
    {
      key: 'prey',
      name: 'Birds of prey',
      categories: ['Birds of prey'],
      independentAssessment: false,
      unrestricted: { individuals: 30, species: 4 },
      broodAssessments: 25,
      restricted: { first: 15, firstBroods: 10, additional: 5, additionalBroods: 5 }
    },
    {
      key: 'waders',
      name: 'Waders & gamebirds',
      categories: ['Waders and gamebirds'],
      independentAssessment: false,
      unrestricted: { individuals: 30, species: 4 },
      broodAssessments: 'n/a',
      restricted: { first: 15, firstBroods: 'n/a', additional: 5, additionalBroods: 'n/a' }
    },
    {
      key: 'waterfowl',
      name: 'Waterfowl',
      categories: ['Waterfowl'],
      independentAssessment: false,
      unrestricted: { individuals: 50, species: 6 },
      broodAssessments: 'n/a',
      restricted: { first: 14, firstBroods: 'n/a', additional: 7, additionalBroods: 'n/a' }
    },
    {
      key: 'colony',
      name: 'Colony-nesting seabirds',
      categories: ['Colony-nesting seabirds'],
      independentAssessment: true,
      unrestricted: { individuals: 50, species: 4 },
      broodAssessments: 25,
      restricted: { first: 20, firstBroods: 10, additional: 10, additionalBroods: 5 }
    },
    {
      key: 'cliff',
      name: 'Cliff-nesting seabirds',
      categories: ['Cliff-nesting seabirds'],
      independentAssessment: true,
      unrestricted: { individuals: 40, species: 3 },
      broodAssessments: 30,
      restricted: { first: 20, firstBroods: 10, additional: 10, additionalBroods: 10 }
    },
    {
      key: 'herons',
      name: 'Herons & egrets',
      categories: ['Herons and egrets'],
      independentAssessment: true,
      unrestricted: { individuals: 30, species: 2 },
      broodAssessments: 20,
      restricted: { first: 20, firstBroods: 10, additional: 10, additionalBroods: 10 }
    }
  ];

  var MISTNET_GROUPS = [
    {
      key: 'passerines',
      name: 'Passerines & near-passerines',
      categories: [
        'Open-nesting passerines and near-passerines',
        'Cavity-nesting passerines and near-passerines'
      ],
      independentAssessment: true,
      unrestricted: { individuals: 500, species: 30 },
      restricted:   { first: 50, second: 40, additional: 15 }
    },
    {
      key: 'prey',
      name: 'Birds of prey',
      categories: ['Birds of prey'],
      independentAssessment: true,
      unrestricted: { individuals: 35, species: 5 },
      restricted:   { first: 15, second: 5, additional: 5 }
    },
    {
      key: 'waders',
      name: 'Waders & gamebirds',
      categories: ['Waders and gamebirds'],
      independentAssessment: true,
      unrestricted: { individuals: 100, species: 9 },
      restricted:   { first: 20, second: 10, additional: 10 }
    },
    {
      key: 'waterfowl',
      name: 'Waterfowl',
      categories: ['Waterfowl'],
      independentAssessment: true,
      unrestricted: { individuals: 35, species: 5 },
      restricted:   { first: 15, second: 5, additional: 5 }
    },
    {
      key: 'colony',
      name: 'Colony-nesting seabirds',
      categories: ['Colony-nesting seabirds'],
      independentAssessment: true,
      unrestricted: { individuals: 100, species: 5 },
      restricted:   { first: 40, second: 15, additional: 15 }
    },
    {
      key: 'cliff',
      name: 'Cliff-nesting seabirds',
      categories: ['Cliff-nesting seabirds'],
      independentAssessment: true,
      unrestricted: { individuals: 50, species: 3 },
      restricted:   { first: 20, second: 15, additional: 15 }
    },
    {
      key: 'herons',
      name: 'Herons & egrets',
      categories: ['Herons and egrets'],
      independentAssessment: true,
      unrestricted: { individuals: 25, species: 2 },
      restricted:   { first: 15, second: 10, additional: 'n/a' }
    }
  ];

  // Whoosh net has one endorsement, not broken down by species group: 15 individuals extracted
  // and 10 active firings, applied across every taxonomic group where a full-grown endorsement
  // is already held (subject to the Trainer / independent assessor restricting it).
  var WHOOSHNET = {
    independentAssessment: true,
    unrestricted: { individualsExtracted: 15, firings: 10 },
    note: 'Applies to all taxonomic groups where a full-grown endorsement is held, unless the applicant\u2019s Trainer or the independent assessor requests to restrict these.'
  };

  window.LICENCE_THRESHOLDS = {
    fullGrown: { label: 'Full grown', groups: FULLGROWN_GROUPS },
    pullus:    { label: 'Pullus',     groups: PULLUS_GROUPS },
    mistNet:   { label: 'Mist net',   groups: MISTNET_GROUPS },
    whooshNet: { label: 'Whoosh net', data: WHOOSHNET }
  };
})();
