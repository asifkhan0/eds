
export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  console.log("Countries block found:", countries);

  const parentDiv = countries.closest('div');
        parentDiv.classList.add('countries-block'); 
        if (countries) {   
            
        }
}
