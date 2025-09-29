function resurgenceImages(){

       const warframeIndex = matchedFrames2.map(matched =>
    warframes.findIndex(f => f.toLowerCase().replace(/\s+/g, '') === matched.toLowerCase().replace(/\s+/g, ''))
    );
}