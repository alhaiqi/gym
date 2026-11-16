// Exercise library, weight-recording units and the A/B workouts.
const LIB = {
  inc_bb:{n:"Incline barbell bench press",lo:6,hi:10,rest:150,c:1},
  inc_db:{n:"Incline dumbbell press",lo:8,hi:12,rest:150,c:1},
  inc_machine:{n:"Incline machine press",lo:8,hi:12,rest:120,c:1},
  smith_inc:{n:"Smith machine incline press",lo:6,hi:10,rest:150,c:1},
  flat_bb:{n:"Flat barbell bench press",lo:6,hi:10,rest:150,c:1},
  flat_db:{n:"Flat dumbbell press",lo:8,hi:12,rest:150,c:1},
  smith_flat:{n:"Smith machine flat press",lo:6,hi:10,rest:150,c:1},
  chest_press:{n:"Machine chest press",lo:10,hi:12,rest:120,c:1},
  pec_deck:{n:"Machine chest fly (pec deck)",lo:12,hi:15,rest:60},
  cable_fly:{n:"Cable fly",lo:12,hi:15,rest:60},
  pulldown:{n:"Cable lat pulldown (overhand)",lo:8,hi:12,rest:120,c:1,warn:"Cable stack, not the plate-loaded reverse-grip machine."},
  pulldown_neutral:{n:"Neutral-grip cable pulldown (V-handle)",lo:8,hi:12,rest:120,c:1},
  assist_pullup:{n:"Assisted pull-up machine",lo:6,hi:10,rest:120,c:1},
  one_arm_pulldown:{n:"One-arm cable pulldown",lo:10,hi:12,rest:90,c:1,note:"per arm"},
  mach_row:{n:"Machine row",lo:8,hi:12,rest:120,c:1},
  cable_row:{n:"Seated cable row",lo:8,hi:12,rest:120,c:1},
  db_row:{n:"One-arm dumbbell row",lo:8,hi:12,rest:90,c:1,note:"per arm"},
  db_lat:{n:"Dumbbell lateral raise",lo:12,hi:15,rest:60},
  cable_lat:{n:"Single-arm cable lateral raise",lo:12,hi:15,rest:60,note:"per arm"},
  machine_lat:{n:"Machine lateral raise",lo:12,hi:15,rest:60},
  face_pull:{n:"Cable face pull",lo:12,hi:15,rest:60},
  rev_pec:{n:"Reverse pec deck",lo:12,hi:15,rest:60},
  rear_db:{n:"Bent-over rear delt raise",lo:12,hi:15,rest:60},
  db_curl:{n:"Seated dumbbell curl",lo:8,hi:12,rest:75},
  ez_curl:{n:"EZ-bar curl",lo:8,hi:12,rest:75},
  cable_curl:{n:"Cable curl",lo:10,hi:12,rest:75},
  hammer_curl:{n:"Hammer curl",lo:8,hi:12,rest:75},
  incline_curl:{n:"Incline dumbbell curl",lo:10,hi:12,rest:75},
  preacher:{n:"One-arm dumbbell preacher curl",lo:10,hi:12,rest:75,note:"per arm"},
  machine_preacher:{n:"Machine preacher curl",lo:10,hi:12,rest:75},
  pushdown:{n:"Rope triceps pushdown",lo:10,hi:15,rest:75},
  bar_pushdown:{n:"Straight-bar triceps pushdown",lo:10,hi:15,rest:75},
  machine_dip:{n:"Assisted / machine dip",lo:8,hi:12,rest:90,c:1},
  oh_ext:{n:"Overhead cable triceps extension",lo:10,hi:15,rest:75},
  oh_db_ext:{n:"Overhead dumbbell triceps extension",lo:10,hi:15,rest:75},
  skullcrusher:{n:"EZ-bar skull crusher",lo:8,hi:12,rest:90},
  wrist_curl:{n:"Dumbbell wrist curl",lo:12,hi:15,rest:60},
  bb_wrist_curl:{n:"Barbell wrist curl",lo:12,hi:15,rest:60},
  cable_wrist_curl:{n:"Cable wrist curl",lo:12,hi:15,rest:60},
  rev_wrist:{n:"Reverse wrist curl",lo:12,hi:15,rest:60},
  bb_rev_wrist:{n:"Barbell reverse wrist curl",lo:12,hi:15,rest:60},
  reverse_curl:{n:"EZ-bar reverse curl",lo:10,hi:15,rest:60},
  cable_crunch:{n:"Cable crunch",lo:10,hi:15,rest:60},
  machine_crunch:{n:"Ab crunch machine",lo:10,hi:15,rest:60},
  decline_crunch:{n:"Decline bench crunch",lo:10,hi:15,rest:60},
  knee_raise:{n:"Hanging knee raise",lo:10,hi:15,rest:60},
  captain_chair:{n:"Captain's chair knee raise",lo:10,hi:15,rest:60},
  leg_raise:{n:"Lying leg raise",lo:10,hi:15,rest:60}
};

const UNIT_TYPES = {
  db:{short:"kg / dumbbell", text:"Weight of ONE dumbbell (e.g. two 12s → 12)"},
  bb:{short:"kg total", text:"Total on the bar, bar included (Olympic bar = 20 kg; check the EZ bar's weight)"},
  smith:{short:"kg plates", text:"Plates only, both sides added (Smith bars differ, so leave the bar out)"},
  stack:{short:"kg on stack", text:"The number where the pin is on the weight stack"},
  plate:{short:"kg plates", text:"All plates loaded, both sides added (the machine itself isn't counted)"},
  assist:{short:"assist kg", text:"Assistance weight on the stack. LOWER is harder, so progress by going down"},
  bw:{short:"kg added", text:"Bodyweight: log reps only. Enter kg only if you hold extra weight"}
};
const UNIT = {
  inc_db:"db",flat_db:"db",db_lat:"db",rear_db:"db",db_curl:"db",hammer_curl:"db",incline_curl:"db",preacher:"db",oh_db_ext:"db",wrist_curl:"db",rev_wrist:"db",db_row:"db",
  inc_bb:"bb",flat_bb:"bb",ez_curl:"bb",skullcrusher:"bb",bb_wrist_curl:"bb",bb_rev_wrist:"bb",reverse_curl:"bb",
  smith_inc:"smith",smith_flat:"smith",
  mach_row:"plate",inc_machine:"plate",
  assist_pullup:"assist",machine_dip:"assist",
  knee_raise:"bw",captain_chair:"bw",leg_raise:"bw",decline_crunch:"bw"
};
function unitOf(id){ return UNIT_TYPES[UNIT[id] || "stack"] }

const DAYS = {
  A:{name:"Chest + biceps focus", slots:[
    {id:"A1",m:"Upper chest",s:3,def:"inc_bb",alts:["inc_db","inc_machine","smith_inc"]},
    {id:"A2",m:"Lats",s:3,def:"pulldown",alts:["pulldown_neutral","assist_pullup","one_arm_pulldown"]},
    {id:"A3",m:"Chest",s:2,def:"chest_press",alts:["flat_db","pec_deck","cable_fly"]},
    {id:"A4",m:"Side delts",s:2,def:"db_lat",alts:["cable_lat","machine_lat"]},
    {id:"A5",m:"Biceps",s:3,def:"db_curl",alts:["ez_curl","cable_curl","hammer_curl","incline_curl"]},
    {id:"A6",m:"Triceps",s:3,def:"pushdown",alts:["bar_pushdown","machine_dip"]},
    {id:"A7",m:"Forearms (front)",s:2,def:"wrist_curl",alts:["bb_wrist_curl","cable_wrist_curl"]},
    {id:"A8",m:"Abs",s:2,def:"cable_crunch",alts:["machine_crunch","decline_crunch","leg_raise"]}
  ]},
  B:{name:"Chest + triceps focus", slots:[
    {id:"B1",m:"Chest",s:3,def:"flat_bb",alts:["flat_db","smith_flat","chest_press"]},
    {id:"B2",m:"Mid back",s:3,def:"mach_row",alts:["cable_row","db_row"]},
    {id:"B3",m:"Rear delts",s:2,def:"face_pull",alts:["rev_pec","rear_db"]},
    {id:"B4",m:"Side delts",s:2,def:"cable_lat",alts:["db_lat","machine_lat"]},
    {id:"B5",m:"Biceps",s:3,def:"preacher",alts:["incline_curl","machine_preacher","cable_curl"]},
    {id:"B6",m:"Triceps",s:3,def:"oh_ext",alts:["oh_db_ext","skullcrusher"]},
    {id:"B7",m:"Forearms (back)",s:2,def:"rev_wrist",alts:["bb_rev_wrist","reverse_curl"]},
    {id:"B8",m:"Abs",s:2,def:"knee_raise",alts:["captain_chair","leg_raise","machine_crunch"]}
  ]}
};
const DOW = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
