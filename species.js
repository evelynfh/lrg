// Ringing Tracker: shared species reference data.
// Single source of truth for species name, BTO 5-letter code, BTO form section and roll-up
// — used by index.html (species picker) and dashboard.html (species breakdown, gaps, BTO export).
// Load BEFORE the page's own <script>.
//
// Each species has:
//   name      what the ringer sees and what gets stored in the sheet
//   code      BTO 5-letter code ('' where there isn't one)
//   category  the dashboard category AND the section of the BTO endorsement form it belongs to.
//             They are deliberately the same thing: one field, no chance of the two drifting apart.
//   parent    (optional) the BTO form row this species counts towards, e.g.
//             'Brent Goose (Dark-bellied)' -> 'Brent Goose'. Omit for a species that has its own row.
//
// BTO_FORM lists the rows printed on the official form, in form order. A logged species whose row
// isn't listed there (rarities, escapes, write-ins) is appended to the end of its section by the
// export, so nothing is dropped. Species typed in as write-ins have no entry in SPECIES_LIST and
// go in an "Other" section.
//
// After editing, run checkSpeciesData() in the browser console: it should return [].

(function () {
  var OPEN  = 'Open-nesting passerines and near-passerines';
  var CAV   = 'Cavity-nesting passerines and near-passerines';
  var PREY  = 'Birds of prey';
  var WADE  = 'Waders and gamebirds';
  var WATER = 'Waterfowl';
  var COL   = 'Colony-nesting seabirds';
  var CLIFF = 'Cliff-nesting seabirds';
  var HERON = 'Herons and egrets';

  window.SPECIES_LIST = [
    // ── Waterfowl ──
    { name: 'Mute Swan', code: 'MUTSW', category: WATER },
    { name: 'Bewick\'s Swan', code: 'BEWSW', category: WATER },
    { name: 'Whooper Swan', code: 'WHOSW', category: WATER },
    { name: 'Black Swan', code: '', category: WATER },
    { name: 'Bar-headed Goose', code: '', category: WATER },
    { name: 'Bean Goose', code: 'BEAGO', category: WATER },
    { name: 'Bean Goose (Taiga)', code: '', category: WATER, parent: 'Bean Goose' },
    { name: 'Bean Goose (Tundra)', code: '', category: WATER, parent: 'Bean Goose' },
    { name: 'Pink-footed Goose', code: 'PIFGO', category: WATER },
    { name: 'White-fronted Goose', code: 'WHFGO', category: WATER },
    { name: 'White-fronted Goose (Greenland)', code: '', category: WATER, parent: 'White-fronted Goose' },
    { name: 'White-fronted Goose (European)', code: '', category: WATER, parent: 'White-fronted Goose' },
    { name: 'Greylag Goose', code: 'GREGO', category: WATER },
    { name: 'Greylag Goose (domestic)', code: '', category: WATER, parent: 'Greylag Goose' },
    { name: 'Snow Goose', code: 'SNOGO', category: WATER },
    { name: 'Canada Goose', code: 'CANGO', category: WATER },
    { name: 'Barnacle Goose', code: 'BARGO', category: WATER },
    { name: 'Brent Goose', code: 'BREGO', category: WATER },
    { name: 'Brent Goose (Dark-bellied)', code: '', category: WATER, parent: 'Brent Goose' },
    { name: 'Brent Goose (Light-bellied)', code: '', category: WATER, parent: 'Brent Goose' },
    { name: 'Brent Goose (Black Brant)', code: '', category: WATER, parent: 'Brent Goose' },
    { name: 'Egyptian Goose', code: 'EGYGO', category: WATER },
    { name: 'Ruddy Shelduck', code: 'RUDSH', category: WATER },
    { name: 'Shelduck', code: 'SHELD', category: WATER },
    { name: 'Mandarin Duck', code: 'MANDA', category: WATER },
    { name: 'Wood Duck', code: 'WOODU', category: WATER },
    { name: 'Wigeon', code: 'WIGEO', category: WATER },
    { name: 'American Wigeon', code: 'AMEWI', category: WATER },
    { name: 'Gadwall', code: 'GADWA', category: WATER },
    { name: 'Teal', code: 'TEAL.', category: WATER },
    { name: 'Green-winged Teal', code: 'GRWTE', category: WATER },
    { name: 'Mallard', code: 'MALLA', category: WATER },
    { name: 'Mallard (domestic)', code: '', category: WATER, parent: 'Mallard' },
    { name: 'Pintail', code: 'PINTA', category: WATER },
    { name: 'Garganey', code: 'GARGA', category: WATER },
    { name: 'Shoveler', code: 'SHOVE', category: WATER },
    { name: 'Red-crested Pochard', code: 'RECPO', category: WATER },
    { name: 'Pochard', code: 'POCHA', category: WATER },
    { name: 'Ring-necked Duck', code: 'RINDU', category: WATER },
    { name: 'Ferruginous Duck', code: 'FERDU', category: WATER },
    { name: 'Tufted Duck', code: 'TUFDU', category: WATER },
    { name: 'Scaup', code: 'SCAUP', category: WATER },
    { name: 'Eider', code: 'EIDER', category: WATER },
    { name: 'Long-tailed Duck', code: 'LOTDU', category: WATER },
    { name: 'Common Scoter', code: 'COMSC', category: WATER },
    { name: 'Surf Scoter', code: 'SURSC', category: WATER },
    { name: 'Velvet Scoter', code: 'VELSC', category: WATER },
    { name: 'Goldeneye', code: 'GOLDE', category: WATER },
    { name: 'Smew', code: 'SMEW.', category: WATER },
    { name: 'Red-breasted Merganser', code: 'REBME', category: WATER },
    { name: 'Goosander', code: 'GOOSA', category: WATER },
    { name: 'Ruddy Duck', code: 'RUDDU', category: WATER },
    { name: 'Muscovy Duck', code: 'MUSDU', category: WATER },

    // ── Gamebirds ──
    { name: 'Red Grouse', code: 'REDGR', category: WADE },
    { name: 'Ptarmigan', code: 'PTARM', category: WADE },
    { name: 'Black Grouse', code: 'BLAGR', category: WADE },
    { name: 'Capercaillie', code: 'CAPER', category: WADE },
    { name: 'Red-legged Partridge', code: 'RELPA', category: WADE },
    { name: 'Grey Partridge', code: 'GREPA', category: WADE },
    { name: 'Quail', code: 'QUAIL', category: WADE },
    { name: 'Pheasant', code: 'PHEAS', category: WADE },
    { name: 'Golden Pheasant', code: 'GOLPH', category: WADE },
    { name: 'Lady Amherst\'s Pheasant', code: 'LAAPH', category: WADE },
    { name: 'Chukar', code: '', category: WADE },
    { name: 'Indian Peafowl', code: '', category: WADE },

    // ── Divers and grebes ──
    { name: 'Red-throated Diver', code: 'RETDI', category: WATER },
    { name: 'Black-throated Diver', code: 'BLTDI', category: WATER },
    { name: 'Great Northern Diver', code: 'GRNDI', category: WATER },
    { name: 'Little Grebe', code: 'LITGR', category: WATER },
    { name: 'Great Crested Grebe', code: 'GRCGR', category: WATER },
    { name: 'Red-necked Grebe', code: 'RENGR', category: WATER },
    { name: 'Slavonian Grebe', code: 'SLAGR', category: WATER },
    { name: 'Black-necked Grebe', code: 'BLNGR', category: WATER },

    // ── Herons and allies ──
    { name: 'Bittern', code: 'BITTE', category: HERON },
    { name: 'Night-heron', code: 'NIGHE', category: HERON },
    { name: 'Little Egret', code: 'LITEG', category: HERON },
    { name: 'Great White Egret', code: 'GRWEG', category: HERON },
    { name: 'Grey Heron', code: 'GREHE', category: HERON },
    { name: 'Purple Heron', code: 'PURHE', category: HERON },
    { name: 'White Stork', code: 'WHIST', category: HERON },
    { name: 'Glossy Ibis', code: 'GLOIB', category: HERON },
    { name: 'Spoonbill', code: 'SPOON', category: HERON },

    // ── Birds of prey ──
    { name: 'Honey-buzzard', code: 'HONBU', category: PREY },
    { name: 'Black Kite', code: 'BLAKI', category: PREY },
    { name: 'Red Kite', code: 'REDKI', category: PREY },
    { name: 'White-tailed Eagle', code: 'WHTEA', category: PREY },
    { name: 'Marsh Harrier', code: 'MARHA', category: PREY },
    { name: 'Hen Harrier', code: 'HENHA', category: PREY },
    { name: 'Montagu\'s Harrier', code: 'MONHA', category: PREY },
    { name: 'Goshawk', code: 'GOSHA', category: PREY },
    { name: 'Sparrowhawk', code: 'SPARR', category: PREY },
    { name: 'Buzzard', code: 'BUZZA', category: PREY },
    { name: 'Rough-legged Buzzard', code: 'ROLBU', category: PREY },
    { name: 'Golden Eagle', code: 'GOLEA', category: PREY },
    { name: 'Osprey', code: 'OSPRE', category: PREY },
    { name: 'Kestrel', code: 'KESTR', category: PREY },
    { name: 'Red-footed Falcon', code: 'REFFA', category: PREY },
    { name: 'Merlin', code: 'MERLI', category: PREY },
    { name: 'Hobby', code: 'HOBBY', category: PREY },
    { name: 'Peregrine', code: 'PEREG', category: PREY },

    // ── Rails, crane and waders ──
    { name: 'Water Rail', code: 'WATRA', category: WADE },
    { name: 'Spotted Crake', code: 'SPOCR', category: WADE },
    { name: 'Corncrake', code: 'CORNC', category: WADE },
    { name: 'Moorhen', code: 'MOORH', category: WADE },
    { name: 'Coot', code: 'COOT.', category: WADE },
    { name: 'Crane', code: 'CRANE', category: WADE },
    { name: 'Oystercatcher', code: 'OYSTE', category: WADE },
    { name: 'Black-winged Stilt', code: 'BLWST', category: WADE },
    { name: 'Avocet', code: 'AVOCE', category: WADE },
    { name: 'Stone-curlew', code: 'STOCU', category: WADE },
    { name: 'Little Ringed Plover', code: 'LIRPL', category: WADE },
    { name: 'Ringed Plover', code: 'RINPL', category: WADE },
    { name: 'Kentish Plover', code: 'KENPL', category: WADE },
    { name: 'Dotterel', code: 'DOTTE', category: WADE },
    { name: 'American Golden Plover', code: 'AMGPL', category: WADE },
    { name: 'Golden Plover', code: 'GOLPL', category: WADE },
    { name: 'Grey Plover', code: 'GREPL', category: WADE },
    { name: 'Lapwing', code: 'LAPWI', category: WADE },
    { name: 'Knot', code: 'KNOT.', category: WADE },
    { name: 'Sanderling', code: 'SANDE', category: WADE },
    { name: 'Little Stint', code: 'LITST', category: WADE },
    { name: 'Temminck\'s Stint', code: 'TEMST', category: WADE },
    { name: 'White-rumped Sandpiper', code: 'WHRSA', category: WADE },
    { name: 'Pectoral Sandpiper', code: 'PECSA', category: WADE },
    { name: 'Curlew Sandpiper', code: 'CURSA', category: WADE },
    { name: 'Purple Sandpiper', code: 'PURSA', category: WADE },
    { name: 'Dunlin', code: 'DUNLI', category: WADE },
    { name: 'Buff-breasted Sandpiper', code: 'BUBSA', category: WADE },
    { name: 'Ruff', code: 'RUFF.', category: WADE },
    { name: 'Jack Snipe', code: 'JACSN', category: WADE },
    { name: 'Snipe', code: 'SNIPE', category: WADE },
    { name: 'Woodcock', code: 'WOODC', category: WADE },
    { name: 'Black-tailed Godwit', code: 'BLTGO', category: WADE },
    { name: 'Bar-tailed Godwit', code: 'BATGO', category: WADE },
    { name: 'Whimbrel', code: 'WHIMB', category: WADE },
    { name: 'Curlew', code: 'CURLE', category: WADE },
    { name: 'Spotted Redshank', code: 'SPORE', category: WADE },
    { name: 'Redshank', code: 'REDSH', category: WADE },
    { name: 'Greenshank', code: 'GRESH', category: WADE },
    { name: 'Lesser Yellowlegs', code: 'LESYE', category: WADE },
    { name: 'Green Sandpiper', code: 'GRESA', category: WADE },
    { name: 'Wood Sandpiper', code: 'WOOSA', category: WADE },
    { name: 'Common Sandpiper', code: 'COMSA', category: WADE },
    { name: 'Turnstone', code: 'TURNS', category: WADE },
    { name: 'Red-necked Phalarope', code: 'RENPH', category: WADE },
    { name: 'Grey Phalarope', code: 'GREPH', category: WADE },

    // ── Seabirds ──
    { name: 'Pomarine Skua', code: 'POMSK', category: COL },
    { name: 'Arctic Skua', code: 'ARCSK', category: COL },
    { name: 'Long-tailed Skua', code: 'LOTSK', category: COL },
    { name: 'Great Skua', code: 'GRESK', category: COL },
    { name: 'Mediterranean Gull', code: 'MEDGU', category: COL },
    { name: 'Little Gull', code: 'LITGU', category: COL },
    { name: 'Sabine\'s Gull', code: 'SABGU', category: COL },
    { name: 'Black-headed Gull', code: 'BLHGU', category: COL },
    { name: 'Ring-billed Gull', code: 'RIBGU', category: COL },
    { name: 'Common Gull', code: 'COMGU', category: COL },
    { name: 'Lesser Black-backed Gull', code: 'LBBGU', category: COL },
    { name: 'Herring Gull', code: 'HERGU', category: COL },
    { name: 'Yellow-legged Gull', code: 'YELGU', category: COL },
    { name: 'Caspian Gull', code: '', category: COL },
    { name: 'Iceland Gull', code: 'ICEGU', category: COL },
    { name: 'Glaucous Gull', code: 'GLAGU', category: COL },
    { name: 'Great Black-backed Gull', code: 'GBBGU', category: COL },
    { name: 'Kittiwake', code: 'KITTI', category: CLIFF },
    { name: 'Sandwich Tern', code: 'SANTE', category: COL },
    { name: 'Roseate Tern', code: 'ROSTE', category: COL },
    { name: 'Common Tern', code: 'COMTE', category: COL },
    { name: 'Arctic Tern', code: 'ARCTE', category: COL },
    { name: 'Little Tern', code: 'LITTE', category: COL },
    { name: 'Black Tern', code: 'BLATE', category: COL },
    { name: 'White-winged Black Tern', code: 'WWBTE', category: COL },
    { name: 'Guillemot', code: 'GUILL', category: CLIFF },
    { name: 'Razorbill', code: 'RAZOR', category: CLIFF },
    { name: 'Black Guillemot', code: 'BLAGU', category: CLIFF },
    { name: 'Little Auk', code: 'LITAU', category: COL },
    { name: 'Puffin', code: 'PUFFI', category: COL },
    { name: 'Fulmar', code: 'FULMA', category: COL },
    { name: 'Cory\'s Shearwater', code: 'CORSH', category: COL },
    { name: 'Great Shearwater', code: 'GRTSH', category: COL },
    { name: 'Sooty Shearwater', code: 'SOOSH', category: COL },
    { name: 'Manx Shearwater', code: 'MANSH', category: COL },
    { name: 'Balearic Shearwater', code: 'BALSH', category: COL },
    { name: 'Wilson\'s Petrel', code: 'WILPE', category: COL },
    { name: 'Storm Petrel', code: 'STOPE', category: COL },
    { name: 'Leach\'s Petrel', code: 'LEAPE', category: COL },
    { name: 'Gannet', code: 'GANNE', category: COL },
    { name: 'Cormorant', code: 'CORMO', category: CLIFF },
    { name: 'Cormorant (Continental)', code: '', category: CLIFF, parent: 'Cormorant' },
    { name: 'Shag', code: 'SHAG.', category: CLIFF },

    // ── Pigeons, cuckoo, owls, swifts, kingfisher, woodpeckers ──
    { name: 'Rock Dove', code: 'ROCDO', category: CAV },
    { name: 'Feral Pigeon', code: '', category: CAV },
    { name: 'Stock Dove', code: 'STODO', category: CAV },
    { name: 'Woodpigeon', code: 'WOODP', category: OPEN },
    { name: 'Collared Dove', code: 'COLDO', category: OPEN },
    { name: 'Turtle Dove', code: 'TURDO', category: OPEN },
    { name: 'Ring-necked Parakeet', code: 'RINPA', category: CAV },
    { name: 'Cuckoo', code: 'CUCKO', category: OPEN },
    { name: 'Barn Owl', code: 'BAROW', category: PREY },
    { name: 'Little Owl', code: 'LITOW', category: PREY },
    { name: 'Tawny Owl', code: 'TAWOW', category: PREY },
    { name: 'Long-eared Owl', code: 'LOEOW', category: PREY },
    { name: 'Short-eared Owl', code: 'SHEOW', category: PREY },
    { name: 'Nightjar', code: 'NIJAR', category: OPEN },
    { name: 'Swift', code: 'SWIFT', category: CAV },
    { name: 'Alpine Swift', code: 'ALPSW', category: CAV },
    { name: 'Kingfisher', code: 'KINGF', category: CAV },
    { name: 'Bee-eater', code: 'BEEEA', category: CAV },
    { name: 'Hoopoe', code: 'HOOPO', category: CAV },
    { name: 'Wryneck', code: 'WRYNE', category: CAV },
    { name: 'Green Woodpecker', code: 'GREWO', category: CAV },
    { name: 'Great Spotted Woodpecker', code: 'GRSWO', category: CAV },
    { name: 'Lesser Spotted Woodpecker', code: 'LESWO', category: CAV },

    // ── Passerines ──
    { name: 'Short-toed Lark', code: 'SHTLA', category: OPEN },
    { name: 'Woodlark', code: 'WOODL', category: OPEN },
    { name: 'Skylark', code: 'SKYLA', category: OPEN },
    { name: 'Shore Lark', code: 'SHOLA', category: OPEN },
    { name: 'Sand Martin', code: 'SANMA', category: CAV },
    { name: 'Swallow', code: 'SWALL', category: OPEN },
    { name: 'Red-rumped Swallow', code: 'RERSW', category: OPEN },
    { name: 'House Martin', code: 'HOUMA', category: CAV },
    { name: 'Richard\'s Pipit', code: 'RICPI', category: OPEN },
    { name: 'Tawny Pipit', code: 'TAWPI', category: OPEN },
    { name: 'Tree Pipit', code: 'TREPI', category: OPEN },
    { name: 'Meadow Pipit', code: 'MEAPI', category: OPEN },
    { name: 'Red-throated Pipit', code: 'RETPI', category: OPEN },
    { name: 'Rock Pipit', code: 'ROCPI', category: OPEN },
    { name: 'Water Pipit', code: 'WATPI', category: OPEN },
    { name: 'Yellow Wagtail', code: 'YELWA', category: OPEN },
    { name: 'Yellow Wagtail (Blue-headed)', code: '', category: OPEN, parent: 'Yellow Wagtail' },
    { name: 'Yellow Wagtail (Grey-headed)', code: '', category: OPEN, parent: 'Yellow Wagtail' },
    { name: 'Grey Wagtail', code: 'GREWA', category: OPEN },
    { name: 'Pied/White Wagtail', code: 'PIEWA', category: OPEN },
    { name: 'Pied Wagtail (yarrellii)', code: '', category: OPEN, parent: 'Pied/White Wagtail' },
    { name: 'White Wagtail (alba)', code: '', category: OPEN, parent: 'Pied/White Wagtail' },
    { name: 'Waxwing', code: 'WAXWI', category: OPEN },
    { name: 'Dipper', code: 'DIPPE', category: CAV },
    { name: 'Wren', code: 'WREN.', category: OPEN },
    { name: 'Dunnock', code: 'DUNNO', category: OPEN },
    { name: 'Robin', code: 'ROBIN', category: OPEN },
    { name: 'Nightingale', code: 'NIGAL', category: OPEN },
    { name: 'Bluethroat', code: 'BLUTH', category: OPEN },
    { name: 'Bluethroat (White-spotted)', code: '', category: OPEN, parent: 'Bluethroat' },
    { name: 'Bluethroat (Red-spotted)', code: '', category: OPEN, parent: 'Bluethroat' },
    { name: 'Black Redstart', code: 'BLARE', category: OPEN },
    { name: 'Redstart', code: 'REDST', category: CAV },
    { name: 'Whinchat', code: 'WHINC', category: OPEN },
    { name: 'Stonechat', code: 'STOCH', category: OPEN },
    { name: 'Wheatear', code: 'WHEAT', category: CAV },
    { name: 'Wheatear (Greenland)', code: '', category: CAV, parent: 'Wheatear' },
    { name: 'Ring Ouzel', code: 'RINOU', category: OPEN },
    { name: 'Blackbird', code: 'BLABI', category: OPEN },
    { name: 'Fieldfare', code: 'FIELD', category: OPEN },
    { name: 'Song Thrush', code: 'SONTH', category: OPEN },
    { name: 'Redwing', code: 'REDWI', category: OPEN },
    { name: 'Mistle Thrush', code: 'MISTH', category: OPEN },
    { name: 'Cetti\'s Warbler', code: 'CETWA', category: OPEN },
    { name: 'Grasshopper Warbler', code: 'GRAWA', category: OPEN },
    { name: 'Savi\'s Warbler', code: 'SAVWA', category: OPEN },
    { name: 'Aquatic Warbler', code: 'AQUWA', category: OPEN },
    { name: 'Sedge Warbler', code: 'SEDWA', category: OPEN },
    { name: 'Marsh Warbler', code: 'MARWA', category: OPEN },
    { name: 'Reed Warbler', code: 'REEWA', category: OPEN },
    { name: 'Icterine Warbler', code: 'ICTWA', category: OPEN },
    { name: 'Melodious Warbler', code: 'MELWA', category: OPEN },
    { name: 'Blackcap', code: 'BLACA', category: OPEN },
    { name: 'Garden Warbler', code: 'GARWA', category: OPEN },
    { name: 'Barred Warbler', code: 'BARWA', category: OPEN },
    { name: 'Lesser Whitethroat', code: 'LESWH', category: OPEN },
    { name: 'Whitethroat', code: 'WHITE', category: OPEN },
    { name: 'Dartford Warbler', code: 'DARWA', category: OPEN },
    { name: 'Subalpine Warbler', code: 'SUBWA', category: OPEN },
    { name: 'Greenish Warbler', code: 'GSHWA', category: OPEN },
    { name: 'Arctic Warbler', code: 'ARCWA', category: OPEN },
    { name: 'Pallas\'s Warbler', code: 'PALWA', category: OPEN },
    { name: 'Yellow-browed Warbler', code: 'YEBWA', category: OPEN },
    { name: 'Radde\'s Warbler', code: 'RADWA', category: OPEN },
    { name: 'Dusky Warbler', code: 'DUSWA', category: OPEN },
    { name: 'Wood Warbler', code: 'WOOWA', category: OPEN },
    { name: 'Chiffchaff', code: 'CHIFF', category: OPEN },
    { name: 'Willow Warbler', code: 'WILWA', category: OPEN },
    { name: 'Goldcrest', code: 'GOLDC', category: OPEN },
    { name: 'Firecrest', code: 'FIREC', category: OPEN },
    { name: 'Spotted Flycatcher', code: 'SPOFL', category: OPEN },
    { name: 'Red-breasted Flycatcher', code: 'REBFL', category: OPEN },
    { name: 'Pied Flycatcher', code: 'PIEFL', category: CAV },
    { name: 'Bearded Tit', code: 'BEATI', category: OPEN },
    { name: 'Long-tailed Tit', code: 'LOTTI', category: OPEN },
    { name: 'Long-tailed Tit (Northern)', code: '', category: OPEN, parent: 'Long-tailed Tit' },
    { name: 'Marsh Tit', code: 'MARTI', category: CAV },
    { name: 'Willow Tit', code: 'WILTI', category: CAV },
    { name: 'Crested Tit', code: 'CRETI', category: CAV },
    { name: 'Coal Tit', code: 'COATI', category: CAV },
    { name: 'Coal Tit (Continental)', code: '', category: CAV, parent: 'Coal Tit' },
    { name: 'Blue Tit', code: 'BLUTI', category: CAV },
    { name: 'Great Tit', code: 'GRETI', category: CAV },
    { name: 'Nuthatch', code: 'NUTHA', category: CAV },
    { name: 'Treecreeper', code: 'TREEC', category: CAV },
    { name: 'Golden Oriole', code: 'GOLOR', category: OPEN },
    { name: 'Red-backed Shrike', code: 'REBSH', category: OPEN },
    { name: 'Great Grey Shrike', code: 'GRGSH', category: OPEN },
    { name: 'Woodchat Shrike', code: 'WOOSH', category: OPEN },
    { name: 'Jay', code: 'JAY..', category: OPEN },
    { name: 'Magpie', code: 'MAGPI', category: OPEN },
    { name: 'Chough', code: 'CHOUG', category: CAV },
    { name: 'Jackdaw', code: 'JACKD', category: CAV },
    { name: 'Rook', code: 'ROOK.', category: OPEN },
    { name: 'Carrion Crow', code: 'CARCR', category: OPEN },
    { name: 'Hooded Crow', code: 'HOOCR', category: OPEN },
    { name: 'Carrion/Hooded Crow hybrid', code: 'INTCR', category: OPEN },
    { name: 'Raven', code: 'RAVEN', category: OPEN },
    { name: 'Starling', code: 'STARL', category: CAV },
    { name: 'Rose-coloured Starling', code: 'ROCST', category: CAV },
    { name: 'House Sparrow', code: 'HOUSP', category: CAV },
    { name: 'Tree Sparrow', code: 'TRESP', category: CAV },
    { name: 'Chaffinch', code: 'CHAFF', category: OPEN },
    { name: 'Brambling', code: 'BRAMB', category: OPEN },
    { name: 'Serin', code: 'SERIN', category: OPEN },
    { name: 'Greenfinch', code: 'GREFI', category: OPEN },
    { name: 'Goldfinch', code: 'GOLDF', category: OPEN },
    { name: 'Siskin', code: 'SISKI', category: OPEN },
    { name: 'Linnet', code: 'LINNE', category: OPEN },
    { name: 'Twite', code: 'TWITE', category: OPEN },
    { name: 'Common Redpoll', code: 'COMRE', category: OPEN, parent: 'Redpoll' },
    { name: 'Lesser Redpoll', code: 'LESRE', category: OPEN, parent: 'Redpoll' },
    { name: 'Common Redpoll (Mealy)', code: '', category: OPEN, parent: 'Redpoll' },
    { name: 'Common Redpoll (Greenland)', code: '', category: OPEN, parent: 'Redpoll' },
    { name: 'Redpoll (Common/Lesser)', code: 'REDPO', category: OPEN, parent: 'Redpoll' },
    { name: 'Arctic Redpoll', code: 'ARCRE', category: OPEN, parent: 'Redpoll' },
    { name: 'Common Crossbill', code: 'CROSS', category: OPEN, parent: 'Crossbill' },
    { name: 'Scottish Crossbill', code: 'SCOCR', category: OPEN },
    { name: 'Parrot Crossbill', code: 'PARCR', category: OPEN, parent: 'Crossbill' },
    { name: 'Common Rosefinch', code: 'SCARO', category: OPEN },
    { name: 'Bullfinch', code: 'BULLF', category: OPEN },
    { name: 'Hawfinch', code: 'HAWFI', category: OPEN },
    { name: 'Lapland Bunting', code: 'LAPBU', category: OPEN },
    { name: 'Snow Bunting', code: 'SNOBU', category: OPEN },
    { name: 'Yellowhammer', code: 'YELHA', category: OPEN },
    { name: 'Cirl Bunting', code: 'CIRBU', category: OPEN },
    { name: 'Ortolan Bunting', code: 'ORTBU', category: OPEN },
    { name: 'Rustic Bunting', code: 'RUSBU', category: OPEN },
    { name: 'Little Bunting', code: 'LITBU', category: OPEN },
    { name: 'Reed Bunting', code: 'REEBU', category: OPEN },
    { name: 'Corn Bunting', code: 'CORBU', category: OPEN },
  ];

  // Display order for the dashboard, and the section order of the BTO export.
  // 'Other' is not a BTO section: it catches write-ins and anything not in SPECIES_LIST.
  window.CATEGORY_ORDER = [OPEN, CAV, PREY, WADE, WATER, COL, CLIFF, HERON, 'Other'];

  // The rows printed on the BTO endorsement form, in form order, by section.
  // 'Redpoll' and 'Crossbill' are roll-up rows: they have no entry of their own in
  // SPECIES_LIST, but other species name them as their `parent`.
  var BTO_FORM = {};
  BTO_FORM[OPEN] = [
    'Nightjar', 'Cuckoo', 'Woodpigeon', 'Turtle Dove', 'Collared Dove',
    'Red-backed Shrike', 'Jay', 'Magpie', 'Rook', 'Carrion Crow', 'Raven',
    'Waxwing', 'Woodlark', 'Skylark', 'Bearded Tit', 'Swallow', 'Wren',
    'Cetti\'s Warbler', 'Long-tailed Tit', 'Wood Warbler', 'Yellow-browed Warbler',
    'Willow Warbler', 'Chiffchaff', 'Sedge Warbler', 'Reed Warbler',
    'Grasshopper Warbler', 'Blackcap', 'Garden Warbler', 'Lesser Whitethroat',
    'Whitethroat', 'Dartford Warbler', 'Firecrest', 'Goldcrest',
    'Ring Ouzel', 'Blackbird', 'Fieldfare', 'Redwing', 'Song Thrush', 'Mistle Thrush',
    'Spotted Flycatcher', 'Robin', 'Bluethroat', 'Nightingale', 'Black Redstart',
    'Whinchat', 'Stonechat', 'Dunnock', 'Yellow Wagtail', 'Grey Wagtail',
    'Pied/White Wagtail', 'Meadow Pipit', 'Tree Pipit', 'Rock Pipit',
    'Chaffinch', 'Brambling', 'Hawfinch', 'Bullfinch', 'Greenfinch', 'Twite', 'Linnet',
    'Redpoll', 'Scottish Crossbill', 'Crossbill', 'Goldfinch', 'Siskin',
    'Snow Bunting', 'Corn Bunting', 'Yellowhammer', 'Reed Bunting'
  ];
  BTO_FORM[CAV] = [
    'Swift', 'Stock Dove', 'Kingfisher', 'Great Spotted Woodpecker', 'Green Woodpecker',
    'Ring-necked Parakeet', 'Chough', 'Jackdaw', 'Coal Tit', 'Crested Tit', 'Marsh Tit',
    'Willow Tit', 'Blue Tit', 'Great Tit', 'Sand Martin', 'House Martin', 'Nuthatch',
    'Treecreeper', 'Starling', 'Pied Flycatcher', 'Redstart', 'Wheatear', 'Dipper',
    'House Sparrow', 'Tree Sparrow'
  ];
  BTO_FORM[PREY] = [
    'Osprey', 'Golden Eagle', 'Sparrowhawk', 'Goshawk', 'Marsh Harrier', 'Hen Harrier',
    'Red Kite', 'Buzzard', 'Barn Owl', 'Tawny Owl', 'Little Owl', 'Long-eared Owl',
    'Short-eared Owl', 'Kestrel', 'Merlin', 'Hobby', 'Peregrine'
  ];
  BTO_FORM[WADE] = [
    'Grey Partridge', 'Quail', 'Water Rail', 'Moorhen', 'Coot',
    'Stone-curlew', 'Oystercatcher', 'Avocet', 'Lapwing',
    'Golden Plover', 'Grey Plover', 'Ringed Plover', 'Little Ringed Plover', 'Whimbrel',
    'Curlew', 'Bar-tailed Godwit', 'Black-tailed Godwit', 'Turnstone', 'Knot', 'Ruff',
    'Curlew Sandpiper', 'Sanderling', 'Dunlin', 'Purple Sandpiper', 'Woodcock',
    'Jack Snipe', 'Snipe', 'Common Sandpiper', 'Green Sandpiper', 'Redshank',
    'Spotted Redshank', 'Greenshank'
  ];
  BTO_FORM[WATER] = [
    'Brent Goose', 'Canada Goose', 'Greylag Goose', 'White-fronted Goose',
    'Mute Swan', 'Bewick\'s Swan', 'Whooper Swan', 'Egyptian Goose', 'Shelduck',
    'Mandarin Duck', 'Shoveler', 'Gadwall', 'Wigeon', 'Mallard', 'Pintail', 'Teal',
    'Pochard', 'Tufted Duck', 'Eider', 'Goldeneye',
    'Little Grebe', 'Red-throated Diver'
  ];
  BTO_FORM[COL] = [
    'Black-headed Gull', 'Mediterranean Gull', 'Common Gull', 'Great Black-backed Gull',
    'Herring Gull', 'Lesser Black-backed Gull', 'Sandwich Tern', 'Little Tern',
    'Roseate Tern', 'Common Tern', 'Arctic Tern', 'Great Skua', 'Arctic Skua',
    'Puffin', 'Storm Petrel', 'Leach\'s Petrel', 'Fulmar', 'Manx Shearwater', 'Gannet'
  ];
  BTO_FORM[CLIFF] = ['Kittiwake', 'Guillemot', 'Razorbill', 'Shag', 'Cormorant'];
  BTO_FORM[HERON] = ['Grey Heron', 'Little Egret'];
  window.BTO_FORM = BTO_FORM;

  // name -> entry lookup
  var byName = {};
  window.SPECIES_LIST.forEach(function (s) { byName[s.name] = s; });

  // name -> dashboard category / BTO section, defaulting to 'Other'
  window.getSpeciesCategory = function (sp) {
    var hit = byName[sp];
    return hit ? hit.category : 'Other';
  };

  // Where a logged species counts on the BTO form: { section, row }.
  // Species not in SPECIES_LIST (write-ins) land in 'Other' on a row of their own.
  window.getBTORow = function (sp) {
    var hit = byName[sp];
    if (!hit) return { section: 'Other', row: sp };
    return { section: hit.category, row: hit.parent || hit.name };
  };

  // Nest type, by category: words to look for in the Pullus method names (the Methods sheet), so the
  // log page can pre-select a method when a species and Pullus are chosen. Categories not listed here
  // (waders, waterfowl, seabirds on colonies...) have no single nest type, so nothing is pre-selected.
  // If the Pullus methods on the sheet are named differently, change the words below.
  var NEST_KEYWORDS = {};
  NEST_KEYWORDS[OPEN]  = ['open'];
  NEST_KEYWORDS[CAV]   = ['cavity', 'nest box', 'nestbox', 'box', 'hole'];
  NEST_KEYWORDS[CLIFF] = ['cliff', 'ledge'];

  window.getNestKeywords = function (sp) {
    var hit = byName[sp];
    return (hit && NEST_KEYWORDS[hit.category]) || [];
  };

  // Consistency check — returns a list of problems ([] = all good).
  window.checkSpeciesData = function () {
    var problems = [];
    var seen = {};
    var validSections = {};
    window.CATEGORY_ORDER.forEach(function (c) { validSections[c] = true; });

    window.SPECIES_LIST.forEach(function (s) {
      if (seen[s.name]) problems.push('Duplicate species name: ' + s.name);
      seen[s.name] = true;
      if (!validSections[s.category] || s.category === 'Other') {
        problems.push(s.name + ': unknown category "' + s.category + '"');
      }
    });

    // Every parent must be a species with its own entry, or a roll-up row on the form,
    // and a child must sit in the same section as its parent.
    var formSection = {};
    Object.keys(BTO_FORM).forEach(function (sec) {
      BTO_FORM[sec].forEach(function (row) {
        if (formSection[row]) problems.push('Row on the BTO form twice: ' + row);
        formSection[row] = sec;
      });
    });
    window.SPECIES_LIST.forEach(function (s) {
      if (!s.parent) return;
      var parentEntry = byName[s.parent];
      var parentSection = parentEntry ? parentEntry.category : formSection[s.parent];
      if (!parentSection) problems.push(s.name + ': parent "' + s.parent + '" is not a species or a BTO form row');
      else if (parentSection !== s.category) problems.push(s.name + ': category differs from its parent "' + s.parent + '"');
      if (parentEntry && parentEntry.parent) problems.push(s.name + ': parent "' + s.parent + '" has a parent itself (roll-ups are one level only)');
    });

    // Every form row must be a species or a roll-up row that something points at, in the right section.
    Object.keys(BTO_FORM).forEach(function (sec) {
      BTO_FORM[sec].forEach(function (row) {
        var entry = byName[row];
        if (entry) {
          if (entry.category !== sec) problems.push(row + ': listed under "' + sec + '" on the form but categorised "' + entry.category + '"');
        } else if (!window.SPECIES_LIST.some(function (s) { return s.parent === row; })) {
          problems.push('BTO form row "' + row + '" matches no species and no parent');
        }
      });
    });

    return problems;
  };
})();
