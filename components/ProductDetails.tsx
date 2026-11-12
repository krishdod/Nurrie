export default function ProductDetails() {
  return (
    <section className="product-notes" id="product-details" aria-labelledby="product-notes-heading">
      <div className="product-notes-intro">
        <span className="section-eyebrow">The product, in detail</span>
        <h2 id="product-notes-heading">A little closer.<br /><em>Every detail matters.</em></h2>
        <p>Meet the design now. Get to know the full formula before launch.</p>
        <a className="text-link" href="#the-ritual">Explore the application ritual <span aria-hidden="true">↗</span></a>
      </div>
      <div className="product-notes-list">
        <details open name="product-notes">
          <summary><span className="note-index">01</span><span>The double-ended design</span><span className="note-symbol" aria-hidden="true">+</span></summary>
          <div className="product-note-body"><p>White colour-changing foundation at one end. A built-in blending brush at the other. Finished in pearl white with rose-gold detailing.</p><p className="product-note-aside">The images on this page are artistic product and campaign views.</p></div>
        </details>
        <details name="product-notes">
          <summary><span className="note-index">02</span><span>Ingredients <small>Details to follow</small></span><span className="note-symbol" aria-hidden="true">+</span></summary>
          <div className="product-note-body"><p>The supplier-confirmed ingredient list is not ready yet. We’ll publish the full list before launch so you can review what goes on your skin.</p></div>
        </details>
        <details name="product-notes">
          <summary><span className="note-index">03</span><span>Skin-tone suitability <small>Details to follow</small></span><span className="note-symbol" aria-hidden="true">+</span></summary>
          <div className="product-note-body"><p>The formula starts white and changes colour as you blend. Confirmed tone suitability is still to come; we’re not promising a match for every skin tone.</p><p className="product-note-aside">The interactive colour study is an illustration, not a shade recommendation or a demonstration of product results.</p></div>
        </details>
        <details name="product-notes">
          <summary><span className="note-index">04</span><span>The first release <small>Coming soon</small></span><span className="note-symbol" aria-hidden="true">+</span></summary>
          <div className="product-note-body"><p>Price, net weight, launch date and final directions will be shared when confirmed. Join the pre-launch list for updates; registration does not place an order or reserve stock.</p><a className="text-link" href="#first-access">Stay in the know <span aria-hidden="true">↗</span></a></div>
        </details>
      </div>
    </section>
  );
}
