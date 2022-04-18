<template>
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Name</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Description</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="fireCheckbox">
      <label class="form-check-label" for="fireCheckbox">
        Fire
      </label>
    </div>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="bugCheckbox">
      <label class="form-check-label" for="bugCheckbox">
        Bug
      </label>
    </div>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="waterCheckbox">
      <label class="form-check-label" for="waterCheckbox">
        Water
      </label>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
